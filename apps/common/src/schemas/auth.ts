import { z } from 'zod/v4'

export const signupSchema = z.object({
  email: z.email({ error: 'Email must be a valid email address' }),
  password: z.string({ error: 'Required' }).min(8, { error: 'Password must be at least 8 characters long' }),
})

export const signinSchema = z.object({
  email: z.email({ error: 'Email must be a valid email address' }),
  password: z.string({ error: 'Required' }),
})
