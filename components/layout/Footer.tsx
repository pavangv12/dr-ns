import Link from "next/link";
import Image from "next/image";
import { doctorProfile } from "@/lib/site-data";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Specialities", "/specialities"],
  ["Procedures", "/procedures"],
  ["Research", "/research"],
  ["Testimonials", "/testimonials"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <Image
            src="/logo-full.png"
            alt="Dr. Nishanth S"
            width={280}
            height={86}
            className="h-auto w-auto"
          />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text)]">Quick Links</h3>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-600">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text)]">Hospital Contact</h3>
          <p className="mt-2 text-sm text-slate-600">{doctorProfile.addressLines.join(", ")}</p>
          <p className="mt-2 text-sm text-slate-600">{doctorProfile.phone}</p>
          <a href={doctorProfile.mapLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-[var(--color-primary)]">
            Open Google Maps
          </a>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-600 md:px-6">
        This website is for informational purposes only and does not constitute medical advice. Please consult Dr. Nishanth S directly for any medical concerns.
        <div className="mt-1">Copyright {new Date().getFullYear()} Dr. Nishanth S. All rights reserved.</div>
      </div>
    </footer>
  );
}
