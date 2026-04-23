"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  authorName: z.string().min(2, "Enter your name"),
  rating: z.number().min(1).max(5),
  text: z.string().min(20, "Please provide at least 20 characters"),
  authorPhoto: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ReviewForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      authorName: "",
      rating: 0,
      text: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setMessage(null);

    let authorPhoto: string | undefined;
    const file = (values.authorPhoto as FileList)?.[0];

    if (file) {
      authorPhoto = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Failed to read image"));
        reader.readAsDataURL(file);
      });
    }

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, authorPhoto }),
    });

    const json = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setMessage(json.message || json.error || "Submission failed");
      return;
    }

    setMessage("Thank you! Your review is being reviewed by our team.");
    reset({
      authorName: "",
      rating: 0,
      text: "",
      authorPhoto: undefined,
    });
    setSelectedRating(0);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-serif text-2xl">Share Your Experience</h3>
      <div>
        <Input placeholder="Patient Name" aria-label="Patient Name" {...register("authorName")} />
        {errors.authorName && <p className="mt-1 text-xs text-red-600">{errors.authorName.message}</p>}
      </div>
      <div>
        <input type="hidden" {...register("rating", { valueAsNumber: true })} />
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            const isFilled = value <= (hoverRating || selectedRating || 0);
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selectedRating === value}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                onClick={() => {
                  setSelectedRating(value);
                  setValue("rating", value, { shouldValidate: true });
                }}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="rounded-md p-1"
              >
                <Star
                  className={isFilled ? "h-6 w-6 fill-[var(--color-gold)] text-[var(--color-gold)]" : "h-6 w-6 text-slate-300"}
                />
              </button>
            );
          })}
        </div>
        {errors.rating && <p className="mt-1 text-xs text-red-600">Rating must be between 1 and 5</p>}
      </div>
      <div>
        <Textarea placeholder="Write your review" aria-label="Review Text" {...register("text")} />
        {errors.text && <p className="mt-1 text-xs text-red-600">{errors.text.message}</p>}
      </div>
      <div>
        <Input type="file" accept="image/*" aria-label="Upload optional photo" {...register("authorPhoto")} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
      {message && <p className="text-sm text-slate-700">{message}</p>}
    </form>
  );
}
