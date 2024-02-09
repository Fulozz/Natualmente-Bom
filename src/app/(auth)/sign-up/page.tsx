"use client";
// NEXT imports
import Link from "next/link";
// HOOKs imports
import { useForm } from "react-hook-form";

// UI imports
import { Icons } from "@/components/Navbar/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
const Page = () => {

    const {} = useForm()

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
          <form
            onSubmit={() => {
              return null;
            }}
          >
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className={cn({
                    "focus-visible:ring-red-500": false,
                  })}
                  placeholder="you@exemple.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": false,
                    })}
                    placeholder="Password"
                  />
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
