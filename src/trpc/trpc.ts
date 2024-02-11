import { initTRPC } from "@trpc/server";
/**
 * file: "trpc/trpc"
 * description: arquivo responsavel pela inicialização do trpc, criação do contexto, e inicialização das procedures
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */

const t = initTRPC.context().create();

export const router = t.router;
export const publictProcedure = t.procedure;