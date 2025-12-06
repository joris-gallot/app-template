<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { client } from '@/lib/trpc'
import { useAuthStore } from '@/stores/auth'

const { me } = useAuthStore()
const { state } = useAsyncState(client.hello.world.query(), null)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-2">
      {{ $t('home.title') }}
    </h1>
    <pre>{{ me }}</pre>
    <pre>{{ state }}</pre>
  </div>
</template>
