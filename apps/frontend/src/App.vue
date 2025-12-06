<script setup lang="ts">
import type { Layout } from '@/types/layouts'
import { LoaderCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const { fetchingUser } = useAuthStore()

const layouts: Record<Layout, unknown> = {
  auth: AuthLayout,
  app: AppLayout,
}

const currentLayout = computed(() => layouts[route.meta.layout])
</script>

<template>
  <div v-if="fetchingUser" class="fixed inset-0 flex items-center justify-center bg-white z-50">
    <LoaderCircle class="animate-spin size-8 text-gray-600" />
  </div>
  <component :is="currentLayout" v-else />
</template>
