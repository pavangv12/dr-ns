import { z } from "zod";

export const reviewSchema = z.object({
  authorName: z.string().trim().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(20).max(2000),
  authorPhoto: z.string().max(1024 * 1024).optional().or(z.literal("")),
});

export const reviewUpdateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  publishToGoogle: z.boolean().optional(),
});
