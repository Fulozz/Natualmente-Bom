import express from "express";
import { getPayload } from "./getPayload";
import { nextApp, nextHandler } from "./nextUtils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayload({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });
  // BACKEND auto hosting
  app.use((req, res) => nextHandler(req, res));
  nextApp.prepare().then(() => {
    //payload.logger.info(`Next.js is ready`)

    app.listen(PORT, async () => {
      //payload.logger.info(`Server is ready on http://localhost:${process.env.NEXT_PUBLIC_PORT || PORT}`)
    });
  });
};

start();
