import { TRPCError } from '@trpc/server'
import { compare, genSalt, hash } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'
import { sign } from 'hono/jwt'
import z from 'zod/v4'
import { db } from '../db'
import { users } from '../db/schema'
import { env } from '../env'
import { formatErrors } from '../error'
import { authProcedure, publicProcedure, router } from '../trpc'

const signupSchema = z.object({
  email: z.email({ error: 'Email must be a valid email address' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters long' }),
})

const signinSchema = z.object({
  email: z.email({ error: 'Email must be a valid email address' }),
  password: z.string(),
})

export const authRouter = router(
  {
    signup: publicProcedure.input(signupSchema).mutation(async ({ input }) => {
      const salt = await genSalt(10)
      const hashedPassword = await hash(input.password, salt)

      const [user] = await db.insert(users).values({
        username: input.email.split('@').at(0)!,
        email: input.email.toLowerCase(),
        password: hashedPassword,
      }).returning({ insertedId: users.id }).catch((error) => {
        if (error.cause.constraint === 'users_email_unique_index') {
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
          message: 'Failed to create user',
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
