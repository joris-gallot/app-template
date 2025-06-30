<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
import { client } from '@/trpc'

const { me } = useAuthStore()
const { state } = useAsyncState(client.hello.world.query(), null)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-2">
      Home
    </h1>
    <pre>{{ me }}</pre>
    <pre>{{ state }}</pre>
  </div>
</template>
