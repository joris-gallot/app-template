import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'

import { cors } from 'hono/cors'
import { auth } from './lib/auth.js'

import { getTrustedOrigins } from './lib/origin.js'
import { appRouter } from './router'
import { createContext } from './trpc/context'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: getTrustedOrigins(),
    credentials: true,
  }),
)

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext,
  }),
)

app.on(['POST', 'GET'], '/api/auth/*', c => auth.handler(c.req.raw))

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
})
