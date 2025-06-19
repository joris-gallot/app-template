import type { AppRouter } from '../../backend/src/trpc'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_BACKEND_URL}/trpc`,
    }),
  ],
})
