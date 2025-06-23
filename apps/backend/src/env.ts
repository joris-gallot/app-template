import process from 'node:process'
import z from 'zod/v4'
import 'dotenv/config'

const envSchema = z.object({
  PG_USER: z.string().default('user'),
  PG_PASSWORD: z.string().default('password'),
  PG_HOST: z.string().default('localhost'),
  PG_PORT: z.number().default(5433),
  PG_DATABASE: z.string().default('app'),
  JWT_SECRET: z.string().default('jwt_secret'),
})

export const env = envSchema.parse(process.env)
