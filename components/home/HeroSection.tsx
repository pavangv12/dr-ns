"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BOOK_URL } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="grid items-center gap-8 py-10 md:grid-cols-5 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:col-span-3"
      >
        <Badge className="mb-4">Kauvery Hospital - Marathahalli</Badge>
        <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--color-text)] md:text-6xl">
          Expert Urological Care You Can Trust
        </h1>
        <p className="mt-4 text-lg text-slate-700">
          Consultant Urologist · Robotic Surgeon · Renal Transplant
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>DrNB Qualified</Badge>
          <Badge>Fellowship - World Endourology Society</Badge>
          <Badge>MPUH Nadiad Trained</Badge>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white"
            aria-label="Book an appointment"
          >
            Book an Appointment
          </a>
          <Link href="/about" className="rounded-xl border border-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-primary)]">
            Learn More About Dr. Nishanth
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative md:col-span-2"
      >
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-3 shadow-xl" style={{ height: 420 }}>
          <div className="relative overflow-hidden rounded-2xl" style={{ height: '100%', width: '100%' }}>
            <Image
              src="/dr-nishanth.jpg"
              alt="Dr. Nishanth S portrait"
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="absolute -left-2 top-8 rounded-xl bg-white/90 p-3 text-xs shadow">Affiliation: Kauvery Hospital</div>
        <div className="absolute -bottom-4 right-0 rounded-xl bg-[var(--color-accent)] px-3 py-2 text-xs font-semibold text-white shadow">
          Uro-Oncology & Robotics
        </div>
      </motion.div>
    </section>
  );
}
