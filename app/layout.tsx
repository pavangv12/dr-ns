import type { Metadata } from "next";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. Nishanth S | Expert Urologist & Robotic Surgeon",
    template: "%s | Dr. Nishanth S",
  },
  description:
    "Trusted Consultant Urologist & Uro-Oncologist at Kauvery Hospital Marathahalli, Bengaluru. Expert in Robotic Surgery and Renal Transplant. Book your consultation today.",
  openGraph: {
    title: "Dr. Nishanth S | Expert Urologist & Robotic Surgeon",
    description:
      "Trusted Consultant Urologist & Uro-Oncologist at Kauvery Hospital Marathahalli, Bengaluru. Expert in Robotic Surgery and Renal Transplant. Book your consultation today.",
    type: "website",
    url: SITE_URL,
    siteName: "Dr. Nishanth S - Urologist",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Dr. Nishanth S - Consultant Urologist, Robotic Surgeon, Kauvery Hospital Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Nishanth S | Expert Urologist & Robotic Surgeon",
    description:
      "Trusted Consultant Urologist & Uro-Oncologist at Kauvery Hospital Marathahalli, Bengaluru. Expert in Robotic Surgery and Renal Transplant. Book your consultation today.",
    images: ["/api/og"],
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">{children}</body>
    </html>
  );
}
