/**
 * file: "trpc/client"
 * description: arquivo responsavel pela criação do cliente trpc
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from './'

export const trpc = createTRPCReact<AppRouter>({})