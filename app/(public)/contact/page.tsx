import type { Metadata } from "next";
import { doctorProfile, BOOK_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | Dr. Nishanth S",
  description: "Contact details, location map, and direct appointment links for Kauvery Hospital Marathahalli.",
};

export default function ContactPage() {
  return (
    <section className="py-12">
      <h1 className="font-serif text-4xl font-semibold">Contact & Location</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-[var(--color-text)]">Kauvery Hospital</h2>
          <p className="mt-2 text-slate-600">{doctorProfile.addressLines.join(", ")}</p>
          <p className="mt-2 text-slate-600">Phone: {doctorProfile.phone}</p>
          <p className="mt-1 text-slate-600">Email: {doctorProfile.email}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={doctorProfile.mapLink} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
              Get Directions
            </a>
            <a href={BOOK_URL} target="_blank" rel="noreferrer" className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
              Book Appointment
            </a>
            <a href="tel:08041804180" className="rounded-xl border border-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
              Call Now
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <iframe
            title="Kauvery Hospital Marathahalli Map"
            src={doctorProfile.mapEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
