import { createAuthClient } from 'better-auth/vue'
import { BACKEND_URL } from './constants'

export const authClient = createAuthClient({
  baseURL: BACKEND_URL,

})
