"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BOOK_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/specialities", label: "Specialities" },
  { href: "/procedures", label: "Procedures" },
  { href: "/research", label: "Research" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6" aria-label="Main navigation">
        <Link href="/" aria-label="Dr. Nishanth S Home" className="flex items-center gap-3">
          <Image src="/logo-icon.png" alt="Dr. Nishanth S" width={50} height={50} className="h-auto w-auto" priority />
          <div className="hidden sm:block">
            <p className="text-lg font-bold text-slate-900 leading-tight">Dr. Nishanth S</p>
            <p className="text-sm text-slate-700">Consultant Urologist</p>
            <p className="text-xs text-slate-500">Uro-Oncology &nbsp;·&nbsp; Robotic Surgery &nbsp;·&nbsp; Renal Transplant</p>
          </div>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-[var(--color-primary)]",
                pathname === item.href ? "text-[var(--color-primary)]" : "text-slate-700",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={BOOK_URL}
            className="rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/30 animate-[pulse_2.5s_ease-in-out_infinite]"
            target="_blank"
            rel="noreferrer"
          >
            Book Now
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label="Toggle mobile menu"
          type="button"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-[var(--color-text)]/70 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mt-10 flex flex-col gap-4">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base text-slate-800"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a href={BOOK_URL} className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-white" target="_blank" rel="noreferrer">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
