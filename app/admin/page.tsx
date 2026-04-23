import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let total = 0;
  let pending = 0;
  let approved = 0;
  let google = 0;
  let averageRating: number | null = null;

  try {
    const [
      totalCount,
      pendingCount,
      approvedCount,
      googleCount,
      averageAggregate,
    ] = await Promise.all([
      prisma.review.count(),
      prisma.review.count({ where: { status: "PENDING" } }),
      prisma.review.count({ where: { status: "APPROVED" } }),
      prisma.review.count({ where: { source: "GOOGLE" } }),
      prisma.review.aggregate({
        _avg: { rating: true },
        where: { status: "APPROVED" },
      }),
    ]);

    total = totalCount;
    pending = pendingCount;
    approved = approvedCount;
    google = googleCount;
    averageRating = averageAggregate._avg.rating;
  } catch {
    total = 0;
    pending = 0;
    approved = 0;
    google = 0;
    averageRating = null;
  }

  const stats: Array<{ label: string; value: string; icon?: typeof Star }> = [
    { label: "Total Reviews", value: String(total) },
    { label: "Pending", value: String(pending) },
    { label: "Approved", value: String(approved) },
    { label: "From Google", value: String(google) },
    {
      label: "Average Rating",
      value: averageRating === null ? "N/A" : `${averageRating.toFixed(1)} ★`,
      icon: Star,
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold">Overview</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              {item.icon && <item.icon size={12} className="text-[#C8933A]" />}
              {item.label}
            </div>
            <div className="mt-1 text-2xl font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
