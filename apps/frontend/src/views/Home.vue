<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { client } from '@/trpc'

const { state } = useAsyncState(client.hello.world.query(), null)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-2">
      Home
    </h1>
    <pre>{{ state }}</pre>
  </div>
</template>
