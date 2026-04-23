"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, Microscope, Stethoscope, FlaskConical, Shield } from "lucide-react";
import { expertise } from "@/lib/site-data";

const icons = [ShieldCheck, HeartPulse, Microscope, Stethoscope, FlaskConical, Shield, Microscope, HeartPulse];

export function ExpertiseSection() {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-3xl font-semibold text-[var(--color-text)]">Core Expertise</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {expertise.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm"
            >
              <Icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
              <p className="mt-3 text-sm text-slate-700">{item}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
