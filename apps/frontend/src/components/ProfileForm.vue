<script setup lang="ts">
import { updateUserSchema } from '@common/schemas/user'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, TriangleAlert } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'

import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'
import { client } from '@/trpc'

const { me, refetchMe } = useAuthStore()

const { handleSubmit, resetForm, meta } = useForm({
  name: 'ProfileForm',
  validationSchema: toTypedSchema(updateUserSchema),
  initialValues: {
    email: me.value?.email,
    name: me.value?.name,
  },
})

const onSubmit = handleSubmit(async (values) => {
  await client.user.update.mutate(values)

  refetchMe()
  toast.success('Updated!', {
    description: 'Your profile has been updated successfully.',
  })
})
</script>

<template>
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="myname" v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <FormDescription>
          This is your public display name. It can be your real name or a pseudonym.
        </FormDescription>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>

        <FormControl>
          <Input type="text" placeholder="example@domain.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <FormDescription>
          <div v-if="me?.emailVerified" class="flex items-center gap-2 text-green-600">
            <Check class="size-4" />
            Verified email
          </div>
          <div v-else class="flex items-center gap-2 text-amber-600">
            <TriangleAlert class="size-4" />
            Not verified email. Check your inbox for a verification email.
          </div>
        </FormDescription>
      </FormItem>
    </FormField>

    <div class="flex gap-2 justify-start">
      <Button type="submit" :disabled="!meta.dirty">
        Update profile
      </Button>

      <Button
        type="button"
        variant="outline"
        @click="resetForm"
      >
        Reset form
      </Button>
    </div>
  </form>
</template>
