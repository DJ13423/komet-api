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
        let limitedDatabase: Level
        let arrayDatabase: Level
        let limitedArrayDatabase: Level
    }
}

global = {
    ...global, variables: {
        app: express() as Express & WebsocketRequestHandler,
        database: new Level('db/database'),
        limitedDatabase: new Level('db/limited-database'),
        arrayDatabase: new Level('db/array-database'),
        limitedArrayDatabase: new Level('db/limited-array-database')
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

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    next()
})

app.use('/api', require('./api').default)


app.get('/api/ping', (req, res) => {
    res.send(`Pong! Komet running version ${packageVersion}`)
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
