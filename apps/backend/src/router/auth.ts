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

export const authRouter = router(
  {
    signup: publicProcedure.input(signupSchema).mutation(async ({ input }) => {
      const emailInput = input.email.toLowerCase()

      const emailAlreadyExists = await db.query.users.findFirst({
        where: eq(users.email, emailInput),
      })

      if (emailAlreadyExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: formatErrors([{ message: 'Email already taken' }]),
        })
      }

      const salt = await genSalt(10)
      const hashedPassword = await hash(input.password, salt)

      const [user] = await db.insert(users).values({
        username: emailInput,
        email: emailInput,
        password: hashedPassword,
      }).returning({ insertedId: users.id })

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
