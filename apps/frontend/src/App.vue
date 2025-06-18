<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="mb-4">
    <nav class="flex gap-2">
      <RouterLink class="underline" to="/">
        Home
      </RouterLink>
      <RouterLink class="underline" to="/about">
        About
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
