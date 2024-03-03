/**
 * file: "trpc/trpc"
 * description: arquivo responsavel pela inicialização do trpc, criação do contexto, e inicialização das procedures
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */
import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context<ExpressContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;