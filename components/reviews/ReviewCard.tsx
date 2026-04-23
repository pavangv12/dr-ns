import { Review } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/reviews/StarRating";
import { formatDate } from "@/lib/utils";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-2">
          <StarRating rating={review.rating} />
          <Badge className={review.source === "GOOGLE" ? "bg-red-50 text-red-700 border-red-200" : ""}>
            {review.source === "GOOGLE" ? "Google" : "Patient Story"}
          </Badge>
        </div>
        <p className="mt-4 flex-1 text-sm leading-6 text-slate-700">{review.text}</p>
        <div className="mt-4 text-xs text-slate-500">
          <div className="font-semibold text-slate-700">{review.authorName}</div>
          <div>{formatDate(review.createdAt)}</div>
        </div>
      </CardContent>
    </Card>
  );
}
