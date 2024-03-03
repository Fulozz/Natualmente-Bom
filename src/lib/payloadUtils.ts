/**
 * file: "lib/payloadUtils.ts"
 * description: arquivo responsavel por pegar os dados do usuario que estão salvos nos cookies e retornar para o front-end
 * data: 03/03/2024
 * author: Thiago Silva Andrade
 */


import { NextRequest } from "next/server"
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { User } from "@/payload-types";

export const getServerSideUser = async (
    cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
    // Puxa o token que está salvo nos cookies
    const token = cookies.get("payload-token")?.value;
    // Utiliza o token para fazer a requisição dos dados do usuario
    const meRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,{
        headers: {
            Authorization: `JWT ${token}`,
        },
    
    });
    // Desestrutura o usuario e coloca ele no padrão que foi definido no schama USER
    const { user } = (await meRes.json()) as { user: User | null };
    return { user };
}