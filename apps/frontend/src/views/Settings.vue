<script setup lang="ts">
import ProfileForm from '@/components/ProfileForm.vue'
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">
      {{ $t('settings.title') }}
    </h1>

    <p class="text-muted-foreground">
      {{ $t('settings.description') }}
    </p>

    <Separator />

    <ProfileForm />
  </div>
</template>
