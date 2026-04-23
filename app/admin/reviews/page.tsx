import { ReviewTable } from "@/components/admin/ReviewTable";

export default function AdminReviewsPage() {
  return (
    <section>
      <h2 className="text-xl font-semibold">Manage Testimonials & Google Sync</h2>
      <p className="mt-2 text-sm text-slate-600">Review, approve, reject and manage publication preferences.</p>
      <div className="mt-6">
        <ReviewTable />
      </div>
    </section>
  );
}
