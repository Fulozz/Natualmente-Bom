/**
 * file: "src/app/(auth)/sign-up/page.tsx"
 * description: arquivo responsavel pela pagina de cadastro de usuario
 * data: 13/02/2024
 * author: Thiago Silva Andrade
 */

"use client";
// NEXT imports
import Link from "next/link";

//TRPC Import
import { trpc } from "@/trpc/client";

// TOAST Import
import { toast } from "sonner";
// HOOKs imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TAuthCredentialSchema,
  AuthCredentialsValidator,
} from "@/lib/validators/accountCredentialsValidator";

// UI imports
import { Icons } from "@/components/Navbar/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialSchema>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  // POST request, modification and mutation
  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      // Erro de email já cadastrado
      if (error.data?.code === "CONFLICT") {
        toast.error("Email já cadastrado, tente outro email");
        return;
      }
      // Segurança Adicional de API error
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
      toast.error("Alguma coisa deu errado, tente novamente");
    },
    onSuccess: ({ sentToEmail }) => {
      // Retorna uma mensagem de sucesso visual para o usuario
      toast.success(
        `Email enviado para ${sentToEmail} com sucesso, verifique sua caixa de entrada e siga as instruções para ativar sua conta!`
      );
      // Vai para a pagina de informação de verificação de email
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialSchema) => {
    // Envia os dados para a API
    mutate({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-bold">Crie uma conta</h1>

          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Já tem uma conta? Faça Login
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.email,
                  })}
                  placeholder="you@exemple.com"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>Criar conta!</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Page;
