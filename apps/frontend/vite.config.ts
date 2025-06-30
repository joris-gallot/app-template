import type { ZodDefault, ZodString } from 'zod/v4'

import { fileURLToPath, URL } from 'node:url'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import tailwindcss from '@tailwindcss/vite'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { z } from 'zod/v4'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  const envSchema: {
    VITE_BACKEND_URL: ZodDefault<ZodString> | ZodString
  } = {
    VITE_BACKEND_URL: z.string(),
  }

  if (isDev) {
    envSchema.VITE_BACKEND_URL = (envSchema.VITE_BACKEND_URL as ZodString).default('http://localhost:3000')
  }

  return {
    plugins: [
      vue(),
      tailwindcss(),
      ValidateEnv({
        validator: 'standard',
        schema: envSchema,
      }),
    ],
    server: {
      port: 3001,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@common': fileURLToPath(new URL('../common/src', import.meta.url)),
      },
    },
  }
})
