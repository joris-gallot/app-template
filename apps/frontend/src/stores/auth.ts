import type { AuthType } from '@common/index'
import { createGlobalState, useAsyncState } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authClient } from '@/lib/auth-client'

type User = NonNullable<AuthType['user']>

export const useAuthStore = createGlobalState(
  () => {
    const me = ref<User>()
    const firstLoad = ref(true)

    const router = useRouter()
    const route = useRoute()

    function handleUserRedirect() {
      const authRoutes = ['Signin', 'Signup']

      if (me.value && authRoutes.includes(route.name as string)) {
        router.push({ name: 'Home' })
      }

      if (!me.value && !authRoutes.includes(route.name as string)) {
        router.push({ name: 'Signin' })
      }
    }

    const { execute: refetchMe } = useAsyncState(
      () => authClient.getSession(),
      undefined,
      {
        resetOnExecute: false,
        onError: () => {
          me.value = undefined
          firstLoad.value = false

          handleUserRedirect()
        },
        onSuccess: (data) => {
          me.value = data?.data?.user ?? undefined
          firstLoad.value = false

          handleUserRedirect()
        },
      },
    )

    function signout() {
      authClient.signOut()
      me.value = undefined
      handleUserRedirect()
    }

    async function googleSignIn() {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: 'http://localhost:3001',
      })
    }

    return {
      me: computed(() => me.value),
      firstLoad: computed(() => firstLoad.value),
      refetchMe,
      signout,
      googleSignIn,
    }
  },
)
