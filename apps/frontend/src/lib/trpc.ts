import type { BackendTrpcRouter } from '@common/index'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { useAuthStore } from '../stores/auth'
import { BACKEND_URL } from './constants'

export const client = createTRPCProxyClient<BackendTrpcRouter>({
  links: [
    httpBatchLink({
      url: `${BACKEND_URL}/trpc`,
      headers() {
        let headers: { Authorization?: string } = {}

        const { token } = useAuthStore()

        if (token.value) {
          headers = {
            Authorization: `Bearer ${token.value}`,
          }
        }

        return headers
      },
      fetch: async (url, options): Promise<Response> => {
        const { setToken } = useAuthStore()
        const res = await fetch(url, options)

        if (res.status === 401) {
          setToken(undefined)
        }

        return res
      },
    }),
  ],
})
