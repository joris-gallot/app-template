import type { Context } from './context'

import { initTRPC, TRPCError } from '@trpc/server'

export const t = initTRPC.context<Context>().create()

export const publicProcedure = t.procedure

export const authProcedure = t.procedure.use(
  async (opts) => {
    const { ctx } = opts

    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return opts.next({
      ctx: {
        user: ctx.user,
      },
    })
  },
)

export const router = t.router
