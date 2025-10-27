import { z } from 'zod';
import validatorLib from 'validator';

export const loginValidator = z
  .object({
    email: z
      .string()
      .email()
      .refine((value) => validatorLib.isEmail(value), 'E-mail inválido'),
    password: z.string().min(10).max(128),
  })
  .strict();

export const tokenValidator = z
  .object({
    refreshToken: z.string().min(10).max(2048),
  })
  .strict();
