import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
import { env } from '../env'

export const db = drizzle({
  schema,
  connection: {
    user: env.PG_USER,
    host: env.PG_HOST,
    database: env.PG_DATABASE,
    password: env.PG_PASSWORD,
    port: env.PG_PORT,
  },
})
