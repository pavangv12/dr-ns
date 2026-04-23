import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { CTASection } from "@/components/home/CTASection";
import { doctorProfile } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dr. Nishanth S | Consultant Urologist in Bengaluru",
  description:
    "Professional portfolio of Dr. Nishanth S, Consultant Urologist, Uro-Oncologist, Robotic and Renal Transplant Surgeon at Kauvery Hospital Marathahalli, Bengaluru.",
};

export default function HomePage() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctorProfile.name,
    medicalSpecialty: "Urology",
    hospitalAffiliation: doctorProfile.hospital,
    address: doctorProfile.addressLines.join(", "),
    telephone: doctorProfile.phone,
    availableLanguage: doctorProfile.languages,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />
      <HeroSection />
      <StatsSection />
      <ExpertiseSection />
      <CTASection />
    </>
  );
}
