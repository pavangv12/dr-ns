import { makeSlug } from "@/lib/utils";

export const BOOK_URL =
  "https://www.kauveryhospitalsbangalore.com/book-an-appointment?hospital_ids=2&speciality_ids=45&doctor_name=Dr.%20Nishanth%20S";

export const doctorProfile = {
  name: "Dr. Nishanth S",
  title: "Consultant - Urology, Uro-Oncology, Robotic & Renal Transplant",
  hospital: "Kauvery Hospital, Marathahalli, Bengaluru",
  qualifications: [
    "MBBS",
    "MS (General Surgery)",
    "DrNB (Genito-Urinary Surgery & Renal Transplant)",
    "Fellowship in Endo-Urology, Laparoscopy & Robotic Surgery (World Endourology Society Inc., USA)",
  ],
  languages: ["Kannada", "English", "Hindi", "Gujarati"],
  mapLink:
    "https://www.google.com/maps/search/Kauvery+Hospital+Marathahalli+Bengaluru/@12.9563,77.7010,17z",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.7010!3d12.9563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b8d1b5b5b5%3A0x1234567890abcdef!2sKauvery+Hospital+Marathahalli!5e0!3m2!1sen!2sin!4v1234567890",
  phone: "080 4180 4180",
  email: "care.mhb@kauveryhospital.com",
  addressLines: [
    "Kauvery Hospital",
    "2371/3, Old HAL Airport Varthur Rd, Munnekolala",
    "Marathahalli, Bengaluru, Karnataka 560037",
  ],
};

export const trainingTimeline = [
  "MBBS - Mysore Medical College & Research Institute, Mysore",
  "MS (General Surgery) - Maulana Azad Medical College, New Delhi",
  "DrNB (Genito-Urinary Surgery & Renal Transplant) - Muljibhai Patel Urological Hospital (MPUH), Nadiad, Gujarat",
  "Fellowship (Endo-Urology, Laparoscopy & Robotics) - World Endourology Society Inc., USA (at MPUH Nadiad)",
];

export const expertise = [
  "Endourology & Kidney Stone Management (RIRS, PCNL, URS)",
  "Renal Transplant Surgery",
  "Robotic & Laparoscopic Urological Surgery",
  "Prostate Disorders & Laser Prostate Surgery (BPH)",
  "Complex Ureteric & Bladder Surgeries",
  "Vascular Access Procedures for Chronic Kidney Patients",
  "Urologic Oncology (Uro-Oncology)",
  "Male Infertility & Reconstructive Urology",
];

export const procedures = [
  {
    name: "RIRS (Retrograde Intrarenal Surgery)",
    description: "Minimally invasive kidney stone laser surgery with rapid recovery and high stone clearance.",
  },
  {
    name: "PCNL (Percutaneous Nephrolithotomy)",
    description: "Procedure for complex or large kidney stones with direct percutaneous access.",
  },
  {
    name: "URS (Ureteroscopy)",
    description: "Endoscopic treatment for ureteric stones and strictures with minimal downtime.",
  },
  {
    name: "Laser Prostate Surgery (HoLEP / ThuLEP / TURP)",
    description: "Advanced BPH treatment options for urinary symptom relief and better quality of life.",
  },
  {
    name: "Robotic-Assisted Urological Surgery",
    description: "Precision surgery for complex urologic conditions with enhanced visualization and control.",
  },
  {
    name: "Laparoscopic Urological Surgery",
    description: "Keyhole surgery options that reduce postoperative pain and hospital stay.",
  },
  {
    name: "Renal Transplant Surgery",
    description: "Comprehensive transplant surgery and perioperative planning for kidney failure patients.",
  },
  {
    name: "Radical/Partial Nephrectomy",
    description: "Kidney cancer surgery tailored to preserve function whenever oncologically feasible.",
  },
  {
    name: "Radical Cystectomy",
    description: "Advanced bladder cancer surgery with personalized urinary diversion planning.",
  },
  {
    name: "Radical Prostatectomy",
    description: "Evidence-based prostate cancer surgery with focus on cancer control and recovery.",
  },
  {
    name: "Vascular Access (AV Fistula / Graft)",
    description: "Durable dialysis access creation for chronic kidney disease and renal failure care.",
  },
  {
    name: "Urethral Reconstruction / Urethroplasty",
    description: "Reconstructive procedures for urethral strictures and functional urinary restoration.",
  },
].map((item) => ({ ...item, slug: makeSlug(item.name) }));

export const publications = [
  {
    title: "Emphysematous Pyelonephritis presenting as acute abdomen with pneumoperitoneum",
    journal: "South East Asian Journal of Case Report and Review",
    date: "Nov 2016",
  },
  {
    title: "Ruptured amoebic liver abscess with perforated amoebic typhlitis",
    journal: "Annals of Tropical Medicine and Public Health",
    date: "2017",
  },
  {
    title: "Malrotation of the Gut in Adults: An Often Forgotten Entity",
    journal: "Academic Publication",
    date: "Mar 2018",
  },
  {
    title: "Pseudocyst presenting as pseudoachalasia",
    journal: "International Surgery Journal",
    date: "Dec 2019",
  },
  {
    title: "Prospective Randomized Controlled Trial to Compare Dusting vs Fragmentation Using Thulium Fiber Laser in RIRS",
    journal: "Journal of Endourology",
    date: "Feb 2024",
  },
  {
    title: "Comparative outcomes of retrograde intrarenal surgery with and without suction: a prospective observational study",
    journal: "Journal of Endourology (Under Peer Review)",
    date: "Manuscript ID: END-2025-0852-OR",
  },
  {
    title: "Comparative study of thulium laser fiber vs. holmium laser for kidney stones in RIRS: a randomized controlled trial",
    journal: "World Journal of Urology (Under Peer Review)",
    date: "Submission ID: 81f83ce9-17ca-4e55-bc69-5aea861db313",
  },
];

export const quickStats = [
  { label: "Procedures Performed", value: 2500 },
  { label: "Years of Training", value: 12 },
  { label: "Research Publications", value: publications.length },
  { label: "Specialised Fellowships", value: 1 },
];
