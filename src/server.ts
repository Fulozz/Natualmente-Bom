/**
 * file: "server"
 * description: arquivo responsavel pela inicialização do servidor e configuração de porta
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */

import express from "express";
import { getPayloadClient } from "./getPayload";
import { nextApp, nextHandler } from "./nextUtils";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./trpc";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({req, res}:  trpcExpress.CreateExpressContextOptions) => ({
  req,
  res
});

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });
  // BACKEND auto hosting //
  // middleware to handle requests to /api/ 
  app.use('/api/trpc', trpcExpress.createExpressMiddleware({ 
    router: appRouter,
    createContext 
  }));

  app.use((req, res) => nextHandler(req, res));
  
  nextApp.prepare().then(() => {
    payload.logger.info(`Next.js is ready`)

    app.listen(PORT, async () => {
        payload.logger.info(`Server is ready on http://localhost:${process.env.NEXT_PUBLIC_PORT || PORT}`)
    })
})
};

start();
