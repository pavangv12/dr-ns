import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { doctorProfile, trainingTimeline } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Dr. Nishanth S",
  description: "Biography, qualifications, and advanced fellowship training of Dr. Nishanth S.",
};

export default function AboutPage() {
  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold text-[var(--color-text)]">About Dr. Nishanth S</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl md:col-span-1" style={{ height: 360 }}>
          <Image src="/dr-nishanth.jpg" alt="Dr. Nishanth S" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        </div>
        <div className="md:col-span-2">
          <p className="text-slate-700">{doctorProfile.title}</p>
          <p className="mt-2 text-slate-700">{doctorProfile.hospital}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {doctorProfile.qualifications.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <h2 className="mt-8 font-serif text-2xl">Training Timeline</h2>
          <ul className="mt-3 space-y-2 text-slate-700">
            {trainingTimeline.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-white p-3">
                {item}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-serif text-2xl">Languages</h2>
          <p className="mt-2 text-slate-700">{doctorProfile.languages.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
