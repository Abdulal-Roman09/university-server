import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});
