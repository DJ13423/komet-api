import express, { Express, Application, json, Request, Response } from "express"
import bodyParser from "body-parser"
import expressWs from "express-ws"
import ws from "ws"
import { Level } from "level"

import { version as packageVersion } from "../package.json"

type WebsocketRequestHandler = { ws: (path: string, handler: (ws: ws, req: express.Request, next?: express.NextFunction) => void) => void }

declare global {
    namespace variables {
        let app: Express & WebsocketRequestHandler
        let database: Level
        let noDeleteDatabase: Level
    }
}

global = {
    ...global, variables: {
        app: express() as Express & WebsocketRequestHandler,
        database: new Level('db/database'),
        noDeleteDatabase: new Level('db/noDeleteDatabase'),
    }
}


type DatabaseData = {
    data: {
        [key: string]: string
    },
    dateCreated: number,
    dateUpdated: number
}


const app: Express = global.variables.app;


expressWs(app)


app.set('query parser', 'extended')

app.use(json());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.text({ type: 'text/plain' })) // parse text/plain

app.use('/api', require('./api').default)


app.get('/api/ping', (req, res) => {
    
    res.send(`Pong! Komet running version ${packageVersion}`) // TODO: respond with version
})


const server = app.listen(process.argv[2] || 8080, async () => {
    console.log(`Komet API v${packageVersion} running on port ${process.argv[2] || 8080}`)
})

export default server

/*
get: get data
post: create data
put: update data
delete: delete data
patch: update part of data
*/
