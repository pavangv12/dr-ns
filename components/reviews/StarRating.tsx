import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn("h-4 w-4", index < rating ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-slate-300")}
        />
      ))}
    </div>
  );
}
