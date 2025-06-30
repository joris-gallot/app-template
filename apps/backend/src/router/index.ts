import { router } from '../trpc'
import { authRouter } from './auth'
import { helloRouter } from './hello'
import { userRouter } from './user'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  hello: helloRouter,
})

export type AppRouter = typeof appRouter
