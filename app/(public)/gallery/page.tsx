import type { Metadata } from "next";
import { BOOK_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Gallery | Dr. Nishanth S",
  description: "Professional media gallery and hospital-affiliated moments.",
};

export default function GalleryPage() {
  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold">Media Gallery</h1>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
        <h2 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Gallery Coming Soon</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
          Photos and videos of Dr. Nishanth S&apos;s work and facilities will be added here soon.
        </p>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white"
        >
          Book Appointment
        </a>
      </div>
    </section>
  );
}
