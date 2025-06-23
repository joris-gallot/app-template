import type { TRPCClientError } from '@trpc/client'

import type { AppRouter } from '../../../backend/src/router'

export type BackendTrpcRouter = AppRouter

export type TRPCError = TRPCClientError<BackendTrpcRouter>
