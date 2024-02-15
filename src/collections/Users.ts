/**
 * file: "src/collections/Users"
 * description: arquivo responsavel pela criação da coleção de usuarios, e configuração de permissões
 * data: 13/02/2024
 * author: Thiago Silva Andrade
 */

import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
          <div>
            <h1>Verifique seu email</h1>
            <p>Clique no link abaixo para verificar seu email</p>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verificar email</a>
          </div>
        `;
      }
    }
  },
  access: {
    create: () => true,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  admin: {
    // verifica se o usuario é admin para poder alterar o campo role
      hidden: ({ user }) => user.role !== "admin",
  },
  fields: [
    {
      name: "role",
      // todos os usuarios criados serão user por padrão
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
