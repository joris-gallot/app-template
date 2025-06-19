import { createGlobalState } from '@vueuse/core'
import { shallowRef } from 'vue'

export const useAuthStore = createGlobalState(
  () => {
    const isAuth = shallowRef(false)

    return { isAuth }
  },
)
