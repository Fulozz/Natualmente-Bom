import { z } from "zod";

export const AuthCredentialSchema = z.object({
    //  Verifica se tem o @ e termina com .com e valida sendo um email real ou não
    email: z.string().email(),
    //  Verifica se a senha tem no minimo 8 caracteres
    password: z
      .string()
      .min(8, { message: "A senha deve ter no minimo 8 caracteres" }),
  });
export  type TAuthCredentialSchema = z.infer<typeof AuthCredentialSchema>