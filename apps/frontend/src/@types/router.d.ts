import type { Layout } from '@/types/layouts'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    noAuth?: boolean
    /**
     * @default 'app'
     */
    layout?: Layout
  }
}
