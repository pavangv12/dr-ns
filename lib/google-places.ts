import crypto from "crypto";

export type GoogleReviewRecord = {
  googleReviewId: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  createdAt: Date;
};

type PlacesResponse = {
  result?: {
    reviews?: Array<{
      author_name: string;
      profile_photo_url?: string;
      rating: number;
      text: string;
      time: number;
      author_url?: string;
    }>;
  };
  status: string;
  error_message?: string;
};

export async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    throw new Error("Google Places API key or Place ID is missing.");
  }

  const params = new URLSearchParams({
    place_id: placeId,
    key: apiKey,
    fields: "reviews",
  });

  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Google Places request failed with status ${response.status}`);
  }

  const json = (await response.json()) as PlacesResponse;
  if (json.status !== "OK") {
    throw new Error(json.error_message || `Google Places returned ${json.status}`);
  }

  const reviews = json.result?.reviews ?? [];

  return reviews.map((review) => {
    const hash = crypto
      .createHash("sha256")
      .update(`${review.author_name}-${review.time}-${review.text}`)
      .digest("hex")
      .slice(0, 24);

    return {
      googleReviewId: review.author_url ? `${review.author_url}-${review.time}` : hash,
      authorName: review.author_name,
      authorPhoto: review.profile_photo_url,
      rating: Math.max(1, Math.min(5, review.rating || 5)),
      text: review.text,
      createdAt: new Date(review.time * 1000),
    } satisfies GoogleReviewRecord;
  });
}
