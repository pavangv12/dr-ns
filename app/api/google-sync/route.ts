import { NextResponse } from "next/server";
import { ReviewSource, ReviewStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { fetchGoogleReviews } from "@/lib/google-places";

export async function GET() {
  try {
    const incoming = await fetchGoogleReviews();
    let inserted = 0;

    for (const item of incoming) {
      const exists = await prisma.review.findUnique({
        where: { googleReviewId: item.googleReviewId },
      });

      if (exists) {
        continue;
      }

      await prisma.review.create({
        data: {
          authorName: item.authorName,
          authorPhoto: item.authorPhoto,
          rating: item.rating,
          text: item.text,
          source: ReviewSource.GOOGLE,
          status: ReviewStatus.APPROVED,
          googleReviewId: item.googleReviewId,
          createdAt: item.createdAt,
        },
      });
      inserted += 1;
    }

    return NextResponse.json({ ok: true, inserted, fetched: incoming.length });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Google sync failed" },
      { status: 500 },
    );
  }
}
