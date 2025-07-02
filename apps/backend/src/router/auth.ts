import { signinSchema, signupSchema } from '@common/schemas/auth'
import { TRPCError } from '@trpc/server'
import { compare, genSalt, hash } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'
import { sign } from 'hono/jwt'
import { db } from '../db'
import { users } from '../db/schema'
import { env } from '../env'
import { formatErrors } from '../error'
import { authProcedure, publicProcedure, router } from '../trpc'

async function findUniqueUsername(baseUsername: string): Promise<string> {
  let username = baseUsername
  let counter = 1

  while (true) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    })

    if (!existingUser) {
      return username
    }

    username = `${baseUsername}${counter}`
    counter++
  }
}

export const authRouter = router(
  {
    signup: publicProcedure.input(signupSchema).mutation(async ({ input }) => {
      const salt = await genSalt(10)
      const hashedPassword = await hash(input.password, salt)

      const baseUsername = input.email.split('@').at(0)!
      const uniqueUsername = await findUniqueUsername(baseUsername)

      const [user] = await db.insert(users).values({
        username: uniqueUsername,
        email: input.email.toLowerCase(),
        password: hashedPassword,
      }).returning({ insertedId: users.id }).catch((error) => {
        if (error.cause.constraint === 'users_email_unique') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: formatErrors([{ message: 'Email already taken' }]),
          })
        }

        return []
      })

      if (!user) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: formatErrors([{ message: 'Failed to create account' }]),
        })
      }

      const token = await sign({ userId: user.insertedId }, env.JWT_SECRET)

      return { token }
    }),

    signin: publicProcedure.input(signinSchema).mutation(async ({ input }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.email.toLowerCase()),
      })

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: formatErrors([{ message: 'Invalid email or password' }]),
        })
      }

      const isPasswordValid = await compare(input.password, user.password)

      if (!isPasswordValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: formatErrors([{ message: 'Invalid email or password' }]),
        })
      }

      const token = await sign({ userId: user.id }, env.JWT_SECRET)

      return { token }
    }),

    signout: authProcedure.mutation(() => {
      // todo
    }),
  },
)
