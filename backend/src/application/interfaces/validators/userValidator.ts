import { z } from 'zod';
import isEmail from 'validator/lib/isEmail';

export const validator = z
  .object({
    name: z.string().min(3).max(120),
    email: z
      .string()
      .email()
      .refine((value) => isEmail(value), 'E-mail inválido'),
    password: z.string().min(10).max(128),
  })
  .strict();
