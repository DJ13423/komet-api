import express, { Express, Application, json, Request, Response } from "express"
import bodyParser from "body-parser"
import qs from 'qs'
import expressWs from "express-ws"
import ws from "ws"
import { Level } from "level"


declare global {
    namespace variables {
        let app: Express & WebsocketRequestHandler
        let permissionsDB: Level
        let accountsDB: Level
    }
}


global = {
    ...global, variables: {
        app: express() as Express & WebsocketRequestHandler,
        permissionsDB: new Level('db/permissions'),
        accountsDB: new Level('db/accounts')
    }
}


type WebsocketRequestHandler = { ws: (path: string, handler: (ws: ws, req: express.Request, next?: express.NextFunction) => void) => void }


const app: Express = global.variables.app;
const permissionsDB: Level = global.variables.permissionsDB
const accountsDB: Level = global.variables.accountsDB


expressWs(app)


app.set('query parser', 'extended')

app.use(json());
app.use(bodyParser.json()) // for parsing application/json


import "./api/broadcast"
import "./api/database"
import "./api/permissions"


app.get('/api/:test1/test2/:test2?', (req, res) => {
    res.send('Got a GET request: ' + req.params.test1 + ' ' + req.params.test2)
})


app.post('/api/', (req, res) => {
    res.send('Got a POST request')
})


app.put('/api/', (req, res) => {
    res.send('Got a PUT request')
})


app.delete('/api/', (req, res) => {
    res.send('Got a DELETE request')
})


app.patch('/api/', (req, res) => {
    res.send('Got a PATCH request')
})


app.listen(80, () => {
    console.log(`Example app listening on port 80`)
})


/*
get: get data
post: create data
put: update data
delete: delete data
patch: update part of data
*/
