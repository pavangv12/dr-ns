import { NextRequest, NextResponse } from "next/server";
import { ReviewSource, ReviewStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { reviewUpdateSchema } from "@/lib/validation";
import { auth } from "@/lib/auth";
import { attemptPublishToGoogle } from "@/lib/google-my-business";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = reviewUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid payload", issues: parsed.error.issues }, { status: 400 });
  }

  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }

  const updates: {
    status?: ReviewStatus;
    publishToGoogle?: boolean;
    googlePosted?: boolean;
  } = {};

  if (parsed.data.status) {
    updates.status = parsed.data.status;
  }
  if (typeof parsed.data.publishToGoogle === "boolean") {
    updates.publishToGoogle = parsed.data.publishToGoogle;
  }

  let gmbMessage: string | undefined;

  if (
    parsed.data.publishToGoogle === true &&
    review.source === ReviewSource.MANUAL &&
    (parsed.data.status === ReviewStatus.APPROVED || review.status === ReviewStatus.APPROVED)
  ) {
    const gmbResult = await attemptPublishToGoogle(review.text, review.rating);
    updates.googlePosted = gmbResult.ok;
    gmbMessage = gmbResult.message;
  }

  const updated = await prisma.review.update({
    where: { id },
    data: updates,
  });

  return NextResponse.json({ review: updated, gmbMessage });
}
