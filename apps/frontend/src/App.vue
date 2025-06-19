<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'

const { isAuth } = useAuthStore()
</script>

<template>
  <AppLayout v-if="isAuth" />
  <RouterView v-else />
</template>
