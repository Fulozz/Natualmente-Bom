"use client"

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-bold">Entrar</h1>
          <form>
            <div className="flex flex-col space-y-4 w-full">
              <input
                type="email"
                required
                placeholder="E-mail"
                className="input"
              />
              <input
                type="password"
                required
                placeholder="Senha"
                className="input"
              />
              <button type="submit" className="button">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link href="/sign-up" className={buttonVariants({ variant: "link" })}>
        Não tem uma conta? Crie uma
      </Link>
    </div>
  );
};

export default Page;
