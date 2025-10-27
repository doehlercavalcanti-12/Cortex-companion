import { z } from 'zod';
import validatorLib from 'validator';

export const validator = z
  .object({
    name: z.string().min(3).max(120),
    email: z
      .string()
      .email()
      .refine((value) => validatorLib.isEmail(value), 'E-mail inválido'),
    password: z.string().min(10).max(128),
  })
  .strict();
