"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { quickStats } from "@/lib/site-data";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString("en-IN"));

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function StatsSection() {
  return (
    <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {quickStats.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/60 bg-white/70 p-4 text-center shadow-sm backdrop-blur-sm">
          <div className="text-xl font-semibold text-[var(--color-primary)]">
            <Counter value={item.value} />+
          </div>
          <div className="mt-1 text-xs text-slate-600">{item.label}</div>
        </div>
      ))}
    </section>
  );
}
