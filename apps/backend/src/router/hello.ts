import z from 'zod'
import { authProcedure, router } from '../trpc'

export const helloRouter = router(
  {
    world: authProcedure.input(z.string().nullish()).query(({ input }) => {
      return `Hello ${input ?? 'World'}!`
    }),
  },
)
