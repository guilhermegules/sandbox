import { z } from "zod";

export const CreateUrlSchema = z.object({
  url: z.string().url(),
  custom_code: z
    .string()
    .regex(/^[A-Za-z0-9]+$/, "Must be alphanumeric")
    .max(16)
    .optional(),
  expires_at: z.string().datetime().optional(),
});

export type CreateUrlDto = z.infer<typeof CreateUrlSchema>;

export const UpdateUrlSchema = z.object({
  url: z.string().url().optional(),
  expires_at: z.string().datetime().optional(),
});

export type UpdateUrlDto = z.infer<typeof UpdateUrlSchema>;

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  per_page: z.coerce.number().int().positive().max(100).default(10),
});

export type PaginationDto = z.infer<typeof PaginationSchema>;
