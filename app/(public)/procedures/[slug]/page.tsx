import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { procedures, BOOK_URL } from "@/lib/site-data";

export function generateStaticParams() {
  return procedures.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = procedures.find((entry) => entry.slug === slug);
  if (!item) return { title: "Procedure Not Found" };
  return {
    title: `${item.name} | Dr. Nishanth S`,
    description: item.description,
  };
}

export default async function ProcedureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = procedures.find((entry) => entry.slug === slug);

  if (!item) notFound();

  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold">{item.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-700">{item.description}</p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold">Clinical Overview</h2>
        <p className="mt-2 text-sm text-slate-600">
          This procedure is performed after clinical evaluation, imaging, and patient-specific planning to maximise outcomes and reduce recovery time.
        </p>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Book Consultation
        </a>
      </div>
    </section>
  );
}
