/**
 * file: "src/trpc/authRouter"
 * description: arquivo responsavel pela rota de autenticação, validação de dados e criação de usuario
 * data: 13/02/2024
 * author: Thiago Silva Andrade
 */

import { AuthCredentialsValidator } from "../lib/validators/accountCredentialsValidator";

import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../getPayload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  // Rota de criação de usuario
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      // Desestrutura o input para pegar o email e a senha
      const { email, password } = input
      const payload = await getPayloadClient()

      // Verifica se o usuario já existe
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })
      // Se o usuario já existir, retorna um erro
      if (users.length !== 0)
        throw new TRPCError({ code: 'CONFLICT' })
      // Cria o usuario
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user',
        },
      })

      return { success: true, sentToEmail: email }
    }),
    verifyEmail: publicProcedure.input(z.object({ token: z.string() })).query( async ({ input })=> {
      // Desestrutura o input para pegar o token
      const { token } = input
      const payload = await getPayloadClient()
      // Verifica se o email foi verificado e o _verified vai ser atualizado para true
      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })
      // Se não for verificado, retorna um erro
      if(!isVerified)
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      // Se for verificado, retorna sucesso              
      return { success: true }
    }),
    signIn: publicProcedure.input(AuthCredentialsValidator).mutation(async ({ input, ctx }) => {
      // Desestrutura o input para pegar o email e a senha
      const { email, password } = input
      const { res } = ctx
      const payload = await getPayloadClient()
      // Verifica se o usuario existe
      try{
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res
        })
        return { success: true }
      } 
      catch (error){
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    })
    
});
