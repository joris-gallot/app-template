import { z } from 'zod/v4'

export const updateUserSchema = z.object({
  username: z
    .string({
      error: 'Username is required.',
    })
    .min(2, {
      error: 'Username must be at least 2 characters.',
    })
    .max(30, {
      error: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .email({ error: 'Email must be a valid email address.' }),
})
