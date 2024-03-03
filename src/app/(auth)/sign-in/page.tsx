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
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Ele identifica na URL e verifica com o banco de dados /sign-in?as=seller
  const isSeller = searchParams.get("as") === "seller";
  // Para o usuario sempre voltar para a origem dele e não pra tela em estado 0
  const origin = searchParams.get("origin");
  // Se o usuario for um comprador, ele vai para a tela de venda
  const continueAsSeller = () => {
    router.push("/sign-in?as=seller");
  };
  // Se o usuario for um comprador, ele vai pra tela principal
  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialSchema>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  // POST request, modification and mutation, and error handling. alteração no nome do mutate para ficar mais visivel
  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Login feito com sucesso");
      // Atualiza a pagina
      router.refresh();
      // Se o usuario tiver uma origem, ele volta para a origem
      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      // Se o usuario for um vendedor, ele vai para a tela de venda
      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Email ou senha incorretos");
        return;
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialSchema) => {
    // Envia os dados para a API
    signIn({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-bold">Entre na sua conta {isSeller ? 'do vendedor' : ''}</h1>

          <Link
            href="/sign-up"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Não tem uma conta? Crie uma!
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
                <Button>Entre!</Button>
              </div>
            </div>
          </form>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full bg-gray-300 border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {isSeller ? (
            <Button
              onClick={continueAsBuyer}
              variant="secondary"
              disabled={isLoading}
            >
              Continuar como comprador
            </Button>
          ) : (
            <Button
              onClick={continueAsSeller}
              variant="secondary"
              disabled={isLoading}
            >
              Continue como vendedor
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
