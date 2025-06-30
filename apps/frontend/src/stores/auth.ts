import { createGlobalState, useAsyncState, useLocalStorage } from '@vueuse/core'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { client } from '@/trpc'

export const useAuthStore = createGlobalState(
  () => {
    const token = useLocalStorage<string | undefined>('jwt', undefined)

    const authRoutes = ['Signin', 'Signup']

    const { state: me, execute: refetchMe } = useAsyncState(
      () => client.user.me.query(),
      undefined,
      {
        resetOnExecute: false,
        onError: () => {
          me.value = undefined
        },
      },
    )

    const router = useRouter()
    const route = useRoute()

    function setToken(t: string | undefined) {
      token.value = t
    }

    watch(token, () => {
      refetchMe()
    })

    watch(me, (newMe, oldMe) => {
      if (oldMe === undefined && newMe !== undefined && authRoutes.includes(route.name as string)) {
        router.push({ name: 'Home' })
      }
      else if (newMe === undefined) {
        router.push({ name: 'Signin' })
      }
    })

    const isAuthenticated = computed(() => Boolean(me.value))

    return {
      me,
      refetchMe,
      isAuthenticated,
      token: computed(() => token.value),
      setToken,
    }
  },
)
