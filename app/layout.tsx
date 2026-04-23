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
    default: "Dr. Nishanth S | Consultant Urologist",
    template: "%s | Dr. Nishanth S",
  },
  description:
    "Professional medical portfolio of Dr. Nishanth S, Consultant Urologist, Uro-Oncologist, Robotic & Renal Transplant Surgeon.",
  openGraph: {
    title: "Dr. Nishanth S | Consultant Urologist",
    description:
      "Consultant Urologist, Uro-Oncologist, Robotic & Renal Transplant Surgeon at Kauvery Hospital Marathahalli.",
    type: "website",
    url: SITE_URL,
    siteName: "Dr. Nishanth S - Urologist",
    images: [
      {
        url: "/dr-nishanth.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Nishanth S - Consultant Urologist",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Nishanth S | Consultant Urologist",
    description:
      "Consultant Urologist, Uro-Oncologist, Robotic & Renal Transplant Surgeon at Kauvery Hospital Marathahalli.",
    images: ["/dr-nishanth.jpg"],
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
