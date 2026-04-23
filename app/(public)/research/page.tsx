import type { Metadata } from "next";
import { publications } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Research & Publications | Dr. Nishanth S",
  description: "Peer-reviewed publications, case reports, and ongoing academic contributions.",
};

export default function ResearchPage() {
  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold">Publications & Book Chapters</h1>
      <div className="mt-8 grid gap-4">
        {publications.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.journal}</p>
            <p className="text-sm text-[var(--color-accent)]">{item.date}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
