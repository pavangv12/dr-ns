import { NextRequest, NextResponse } from "next/server";
import { Prisma, ReviewSource, ReviewStatus } from "@prisma/client";
import sanitizeHtml from "sanitize-html";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { reviewSchema } from "@/lib/validation";
import { auth } from "@/lib/auth";

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "anonymous";
  }
  return request.headers.get("x-real-ip") || "anonymous";
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = request.nextUrl;
    const source = searchParams.get("source");
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "9");
    const includeAll = searchParams.get("all") === "1";
    const statusParam = searchParams.get("status");

    const where: Prisma.ReviewWhereInput = {};

    if (source === "GOOGLE") where.source = ReviewSource.GOOGLE;
    if (source === "MANUAL") where.source = ReviewSource.MANUAL;

    if (includeAll && session) {
      if (statusParam && ["PENDING", "APPROVED", "REJECTED"].includes(statusParam)) {
        where.status = statusParam as ReviewStatus;
      }
    } else {
      where.status = ReviewStatus.APPROVED;
    }

    const [items, total, aggregate] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.review.count({ where }),
      prisma.review.aggregate({
        _avg: { rating: true },
        _count: { _all: true },
        where: { status: ReviewStatus.APPROVED },
      }),
    ]);

    return NextResponse.json({
      items,
      page,
      limit,
      total,
      hasMore: page * limit < total,
      averageRating: aggregate._avg.rating ?? 0,
      approvedCount: aggregate._count._all,
    });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      {
        items: [],
        total: 0,
        averageRating: 0,
        hasMore: false,
        approvedCount: 0,
      },
      { status: 200 },
    );
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limitResult = checkRateLimit(ip);

  if (!limitResult.allowed) {
    return NextResponse.json(
      { message: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid input.", issues: parsed.error.issues }, { status: 400 });
  }

  const authorName = sanitizeHtml(parsed.data.authorName, { allowedTags: [], allowedAttributes: {} });
  const text = sanitizeHtml(parsed.data.text, { allowedTags: [], allowedAttributes: {} });
  const authorPhoto = parsed.data.authorPhoto
    ? sanitizeHtml(parsed.data.authorPhoto, { allowedTags: [], allowedAttributes: {} })
    : null;

  try {
    const created = await prisma.review.create({
      data: {
        authorName,
        rating: parsed.data.rating,
        text,
        authorPhoto,
        source: ReviewSource.MANUAL,
        status: ReviewStatus.PENDING,
      },
    });

    return NextResponse.json({
      id: created.id,
      message: "Thank you! Your review is being reviewed by our team.",
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Database not configured. Please set DATABASE_URL." },
      { status: 503 },
    );
  }
}
