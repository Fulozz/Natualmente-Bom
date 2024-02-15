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

export const authRouter = router({
  // Rota de criação de usuario
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayloadClient()

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (users.length !== 0)
        throw new TRPCError({ code: 'CONFLICT' })

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
});
