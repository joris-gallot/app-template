import z from 'zod/v4'
import { authProcedure, router } from '../trpc'

export const helloRouter = router(
  {
    world: authProcedure.input(z.string().nullish()).query(({ input }) => {
      return `Hello ${input ?? 'World'}!`
    }),
  },
)
