import { z } from 'zod';
import { USER_STATUS } from './user.constance';

const userValidationSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});

const changeStatusValidationSchma = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]])
  })
})

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchma
}