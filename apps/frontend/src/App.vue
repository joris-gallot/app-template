<script setup lang="ts">
import type { Layout } from '@/types/layouts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

const route = useRoute()

const layouts: Record<Layout, unknown> = {
  auth: AuthLayout,
  app: AppLayout,
}

const currentLayout = computed(() => route.meta.layout ? layouts[route.meta.layout] : AppLayout)
</script>

<template>
  <component :is="currentLayout" />
</template>
