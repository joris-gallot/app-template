import { fileURLToPath, URL } from 'node:url'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import tailwindcss from '@tailwindcss/vite'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { z } from 'zod'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      tailwindcss(),
      ValidateEnv({
        validator: 'standard',
        schema: {
          VITE_BACKEND_URL: z.string(),
        },
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
