<script setup lang="ts">
import { Home, LogOut, Settings } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { authClient } from '@/lib/auth-client'
import { useAuthStore } from '@/stores/auth'
import Button from './ui/button/Button.vue'

const { setToken } = useAuthStore()

const routes = [
  {
    title: 'Home',
    name: 'Home',
    icon: Home,
  },
  {
    title: 'Settings',
    name: 'Settings',
    icon: Settings,
  },
]

async function signout() {
  await authClient.signOut()
  setToken(undefined)
}
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="route in routes" :key="route.title">
              <SidebarMenuButton as-child>
                <RouterLink :to="{ name: route.name }">
                  <component :is="route.icon" />
                  <span>{{ route.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup class="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Button data-testid="signout-btn" variant="ghost-destructive" class="w-full" @click="signout">
                <LogOut />
                <span>Log out</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
