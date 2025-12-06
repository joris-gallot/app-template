<script setup lang="ts">
import type { Layout } from '@/types/layouts'
import { LoaderCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const { firstLoad } = useAuthStore()

const layouts: Record<Layout, unknown> = {
  auth: AuthLayout,
  app: AppLayout,
}

const currentLayout = computed(() => layouts[route.meta.layout])
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-in"
    leave-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="firstLoad" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <LoaderCircle class="animate-spin size-8 text-gray-600" />
    </div>
  </Transition>
  <component :is="currentLayout" v-if="!fetchingUser" />
</template>
