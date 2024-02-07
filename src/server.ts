import express from 'express'
import { getPayload } from './getPayload'
import { nextHandler } from './nextUtils'


const app = express()
const PORT = Number(process.env.PORT) || 3000


const start = async () => {
    const payload = await getPayload({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
            }
        }
    })
    // Self hosting backend
    app.use((req,res) => nextHandler(req, res))
}


start()