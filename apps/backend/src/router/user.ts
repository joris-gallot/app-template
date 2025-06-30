import { updateUserSchema } from '@common/schemas/user'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import { authProcedure, router } from '../trpc'

export const userRouter = router(
  {
    me: authProcedure.query(async ({ ctx }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.id, ctx.user.id),
        columns: {
          id: true,
          email: true,
          emailVerified: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      return user
    }),
    update: authProcedure.input(updateUserSchema).mutation(async ({ input, ctx: { user } }) => {
      await db.update(users).set(input).where(eq(users.id, user.id))
    }),
  },
)
