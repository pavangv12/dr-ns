import type { Metadata } from "next";
import { expertise } from "@/lib/site-data";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Specialities | Dr. Nishanth S",
  description: "Explore all areas of clinical expertise of Dr. Nishanth S in urology and uro-oncology.",
};

export default function SpecialitiesPage() {
  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold">Areas of Expertise</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expertise.map((item) => (
          <article key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
            <h2 className="mt-3 text-base font-semibold text-[var(--color-text)]">{item}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}
