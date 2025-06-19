<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="grow px-1 sm:px-6 lg:px-8">
      <SidebarTrigger />
      <RouterView />
    </main>
  </SidebarProvider>
</template>
