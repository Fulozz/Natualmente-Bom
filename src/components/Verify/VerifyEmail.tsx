/**
 * file: "src/components/Verify/VerifyEmail"
 * description: arquivo responsavel pela pagina de Loading, Erro e Sucesso de verificação de email
 * data: 02/03/2024
 * author: Thiago Silva Andrade
 */

"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

// Define a interface VerifyEmailProps para tipar o token
interface VerifyEmailProps {
  token: string;
}
const VerifyEmail = ({ token }: VerifyEmailProps) => {
  // Destrutura o objeto trpc.auth.verifyEmail para utilizar a procedure verifyEmail
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 x-8 text-red-600" />
        <p className="text-muted-foreground text-sm">
          Houve um erro token invalido ou expirado por favor tente novamente
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image
            src="/hippo-email-sent.png"
            fill
            alt="Hippo sending an email"
          />
        </div>
        <h3 className="font-semibold text-2xl">Sua conta está pronta!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Obrigado por verificar seu email
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Faça login
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
        <h3 className="text-muted-foreground text-sm">
          Verificando seu email...
        </h3>
        <p className="text-muted-foreground text-sm">Não irá demorar muito.</p>
      </div>
    );
  }
};
export default VerifyEmail;
