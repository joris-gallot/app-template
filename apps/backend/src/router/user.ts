import { updateUserSchema } from '@common/schemas/user'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { user } from '../db/schema'
import { authProcedure, router } from '../trpc'

export const userRouter = router(
  {
    me: authProcedure.query(async ({ ctx }) => {
      const user = await db.query.user.findFirst({
        where: user => eq(user.id, ctx.user.id),
        columns: {
          id: true,
          email: true,
          emailVerified: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      return user
    }),
    update: authProcedure.input(updateUserSchema).mutation(async ({ input, ctx }) => {
      await db.update(user).set(input).where(eq(user.id, ctx.user.id))
    }),
  },
)
