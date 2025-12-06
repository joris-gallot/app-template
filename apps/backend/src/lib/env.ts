import process from 'node:process'
import z from 'zod/v4'
import 'dotenv/config'

const envSchema = z.object({
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_HOST: z.string(),
  PG_PORT: z.number(),
  PG_DATABASE: z.string(),
  JWT_SECRET: z.string(),
  GOOGLE_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
})

export const env = envSchema.parse(process.env)
