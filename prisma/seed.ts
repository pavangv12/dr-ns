import { PrismaClient, ReviewSource, ReviewStatus } from "@prisma/client";
import { doctorProfile, expertise, procedures, publications } from "../lib/site-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.doctorProfile.deleteMany();
  await prisma.expertise.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.publication.deleteMany();
  await prisma.review.deleteMany({ where: { source: ReviewSource.MANUAL } });

  await prisma.doctorProfile.create({
    data: {
      name: doctorProfile.name,
      title: doctorProfile.title,
      hospital: doctorProfile.hospital,
      qualifications: doctorProfile.qualifications.join(" | "),
      languages: doctorProfile.languages.join(", "),
      mapLink: doctorProfile.mapLink,
      phone: doctorProfile.phone,
      email: doctorProfile.email,
      address: doctorProfile.addressLines.join(" | "),
    },
  });

  await prisma.expertise.createMany({
    data: expertise.map((title) => ({ title })),
  });

  await prisma.procedure.createMany({
    data: procedures.map((item) => ({
      slug: item.slug,
      name: item.name,
      description: item.description,
    })),
  });

  await prisma.publication.createMany({
    data: publications.map((item) => ({
      title: item.title,
      journal: item.journal,
      dateLabel: item.date,
    })),
  });

  await prisma.review.createMany({
    data: [
      {
        authorName: "Patient Story",
        rating: 5,
        text: "Very professional consultation and excellent clarity before surgery.",
        source: ReviewSource.MANUAL,
        status: ReviewStatus.APPROVED,
      },
      {
        authorName: "Family Caregiver",
        rating: 5,
        text: "Compassionate support and thorough follow-up throughout the treatment.",
        source: ReviewSource.MANUAL,
        status: ReviewStatus.APPROVED,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
