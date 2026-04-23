import type { Metadata } from "next";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewGrid } from "@/components/reviews/ReviewGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Testimonials & Reviews | Dr. Nishanth S",
  description: "Patient stories and verified public reviews including Google reviews.",
};

export default function TestimonialsPage() {
  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold">Testimonials & Reviews</h1>
      <p className="mt-2 text-slate-600">Read trusted patient feedback and share your experience.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReviewGrid />
        </div>
        <div>
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}
