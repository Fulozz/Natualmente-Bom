/**
 * file: "payload.config"
 * description: arquivo responsavel pela criação da tela de admin, configuração do banco de dados, e configuração do editor de texto
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import  dotenv  from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  collections: [Users],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    // Configuração do webpack
    bundler: webpackBundler(),
    // Configuração do titulo da pagina e favicon
    meta: {
      titleSuffix: "- Natualmente Bom",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  // Configuração do limite de requisições
  rateLimit: {
    max: 2000,
  },
  // Configuração do editor de texto
  editor: slateEditor({}),
  // Configuração do banco de dados
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  // Local que será gerado automaticamente as typagens de dados
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
