"use client"
/**
 * file: "components/Providers"
 * description: arquivo responsavel pela execução das APIs, querrys e mutations
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */
import { useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import { trpc } from "@/trpc/client"
import { httpBatchLink } from "@trpc/client"

const Providers = () => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient]= useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`
            })
        ]
    }))
}
export default Providers
