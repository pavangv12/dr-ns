"use client";

import { useEffect, useMemo, useState } from "react";
import { Review } from "@prisma/client";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import ReviewSkeleton from "@/components/reviews/ReviewSkeleton";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/reviews/StarRating";

type Payload = {
  items: Review[];
  hasMore: boolean;
  averageRating: number;
  approvedCount: number;
  total?: number;
};

export function ReviewGrid() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFilterChange(value: string) {
    setFilter(value);
    setPage(1);
  }

  const sourceQuery = useMemo(() => {
    if (filter === "GOOGLE") return "&source=GOOGLE";
    if (filter === "MANUAL") return "&source=MANUAL";
    return "";
  }, [filter]);

  const emptyStateMessage = useMemo(() => {
    if (filter === "GOOGLE") return "No Google reviews synced yet. Check back soon.";
    if (filter === "MANUAL") return "No patient stories yet. Submit yours below!";
    return "No reviews yet. Be the first to share your experience!";
  }, [filter]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/reviews?page=${page}&limit=9${sourceQuery}`);
        if (!response.ok) {
          setLoading(false);
          setError("Unable to load reviews at this time.");
          return;
        }

        const json = (await response.json()) as Payload;
        setLoading(false);

        if (page === 1) {
          setReviews(json.items);
        } else {
          setReviews((prev) => [...prev, ...json.items]);
        }
        setHasMore(json.hasMore);
        setAverageRating(json.averageRating);
        setApprovedCount(json.approvedCount);
      } catch {
        setLoading(false);
        setError("Unable to load reviews at this time.");
      }
    }

    load();
  }, [page, sourceQuery]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-sm text-slate-500">Average Rating</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-semibold text-[var(--color-text)]">{averageRating.toFixed(1)}</span>
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-xs text-slate-500">({approvedCount} reviews)</span>
          </div>
        </div>
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          options={[
            { label: "All", value: "ALL" },
            { label: "From Google", value: "GOOGLE" },
            { label: "Patient Stories", value: "MANUAL" },
          ]}
        />
      </div>

      {loading && page === 1 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ReviewSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-600">
          {error}
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-600">
          {emptyStateMessage}
        </div>
      )}

      <div className="mt-6 text-center">
        {hasMore && (
          <Button type="button" variant="secondary" onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
}
