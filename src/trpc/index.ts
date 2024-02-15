/**
 * file: "trpc/index"
 * description: arquivo responsavel pela criação das rotas e procedimentos
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */
import { authRouter } from './authRouter';
import { router } from './trpc'

export const appRouter = router({
    // Define a new route
    auth: authRouter
});

export type AppRouter = typeof appRouter;