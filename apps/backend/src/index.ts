import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import pino from 'pino'
import { createContext } from './context'
import { appRouter } from './router'

const app = new Hono()

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
})

app.use(
  '/trpc/*',
  cors(),
  trpcServer({
    router: appRouter,
    createContext,
    onError: ({ error }) => {
      logger.error(error)
    },
  }),
)

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
})
