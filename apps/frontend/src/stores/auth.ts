import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = createGlobalState(
  () => {
    const token = useLocalStorage<string | null>('jwt', null)
    const router = useRouter()

    function setToken(t: string | null) {
      token.value = t
    }

    watch(token, (newToken, oldToken) => {
      if (oldToken === null && newToken !== null) {
        router.push({ name: 'Home' })
      }
      else if (newToken === null) {
        router.push({ name: 'Signin' })
      }
    })

    const isAuthenticated = computed(() => Boolean(token.value))

    return {
      isAuthenticated,
      token: computed(() => token.value),
      setToken,
    }
  },
)
