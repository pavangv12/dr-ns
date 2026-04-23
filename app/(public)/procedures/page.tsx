import type { Metadata } from "next";
import Link from "next/link";
import { ActivitySquare } from "lucide-react";
import { procedures } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Procedures | Dr. Nishanth S",
  description: "Detailed list of advanced urological procedures and surgical interventions.",
};

export default function ProceduresPage() {
  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold">Procedure Details</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {procedures.map((item) => (
          <article key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-5">
            <ActivitySquare className="h-5 w-5 text-[var(--color-primary)]" />
            <h2 className="mt-3 text-lg font-semibold">{item.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            <Link href={`/procedures/${item.slug}`} className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent)]">
              Learn More
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
