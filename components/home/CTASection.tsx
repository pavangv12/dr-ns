import { BOOK_URL } from "@/lib/site-data";

export function CTASection() {
  return (
    <section className="mt-14 rounded-3xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] p-8 text-white">
      <h2 className="font-serif text-3xl font-semibold">Prioritise Early Consultation for Better Outcomes</h2>
      <p className="mt-3 max-w-2xl text-sm text-white/90">
        Schedule an appointment for personalised diagnosis and treatment planning with advanced minimally invasive and robotic options.
      </p>
      <a
        href={BOOK_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)]"
      >
        Book an Appointment
      </a>
    </section>
  );
}
