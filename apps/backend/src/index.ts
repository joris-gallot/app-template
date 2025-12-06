import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { appRouter } from './router'
import { createContext } from './trpc/context'

const app = new Hono()

app.use(
  '/trpc/*',
  cors(),
  trpcServer({
    router: appRouter,
    createContext,
  }),
)

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
})
