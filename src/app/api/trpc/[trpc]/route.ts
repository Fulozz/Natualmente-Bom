/**
 * file: "app/api/trpc/[trpc]/route"
 * description: arquivo responsavel pela URL mutável 
 * data: 12/02/2024
 * author: Thiago Silva Andrade
 */
import { appRouter } from '@/trpc';
import {fetchRequestHandler} from '@trpc/server/adapters/fetch';

const handler = async (req: Request) => {
    fetchRequestHandler({
        endpoint: '/api/trpc',	
        req,
        router: appRouter,
        // @ts-expect-error context já foi criado pelo express middleware
        createContext: () => ({}),
    })
}
export {handler as GET, handler as POST}