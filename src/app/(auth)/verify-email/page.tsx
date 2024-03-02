/**
 * file: "src/app/(auth)/verify-email/page.tsx"
 * description: arquivo responsavel pela pagina de verificação de email
 * data: 02/03/2024
 * author: Thiago Silva Andrade
 */

import VerifyEmail from "@/components/Verify/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const verifyEmailPage = ({ searchParams }: PageProps) => {
  // Pega os parametros usados na URL e define como token
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1 ">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                fill
                alt="Hippo sending an email"
              />
            </div>
            <h3 className="font-semibold text-2xl"> Olhe seu email!</h3>

            {toEmail ? (
              <p className="text-muted-foreground text-center">
                Nós enviamos um email para{" "}
                <span className="font-semibold">{toEmail}</span>
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                {" "}
                Nós enviamos um link de verificação para seu email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default verifyEmailPage;
