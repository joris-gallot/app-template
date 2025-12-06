import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { eq } from 'drizzle-orm'
import { verify } from 'hono/jwt'
import { db } from '../db'
import { users } from '../db/schema'
import { env } from '../env'

export async function createContext({
  req,
}: FetchCreateContextFnOptions) {
  async function getUserFromHeader() {
    const token = req.headers.get('Authorization')?.split(' ').at(1)

    if (token) {
      const jwtPayload = await verify(
        token,
        env.JWT_SECRET,
      ).catch(() => null)

      if (!jwtPayload || typeof jwtPayload.userId !== 'number') {
        return null
      }

      const user = await db.query.users.findFirst({
        where: eq(users.id, jwtPayload.userId),
        columns: {
          id: true,
        },
      }).catch(() => null)

      return user
    }

    return null
  }

  const user = await getUserFromHeader()

  return {
    user,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
