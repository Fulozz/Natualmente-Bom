/**
 * file: "nextUtils"
 * description: arquivo responsavel pela configuração de porta que irá ser utilizado para acessar o backend
 * data: 11/02/2024
 * author: Thiago Silva Andrade
 */

import next from "next"

const PORT = Number(process.env.PORT) || 3000


export const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    port: PORT
})


export const nextHandler = nextApp.getRequestHandler()