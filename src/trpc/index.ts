/**
 * file: "trpc/index"
 * description: arquivo responsavel pela criação das rotas e procedimentos
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */
import {publictProcedure, router } from './trpc'

export const appRouter = router({
    // Define a new route
    anyApiRoute: publictProcedure.query(()=>{
        return {message: 'Hello World'}
    })
});

export type AppRouter = typeof appRouter;