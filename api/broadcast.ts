import { Express } from 'express'
import { Level } from 'level'
import RoomManager from '../classes/roomManager'

const app = global.variables.app;
const permissionsDB: Level = global.variables.permissionsDB

app.ws('/api/broadcast/:roomID', (ws, req) => {
    const token: string | undefined = req.headers.authorization
    const { roomID } = req.params
    if (token === undefined) {
        ws.close()
        return
    }
    const room = RoomManager.getRoom(roomID)
    if (room === undefined) {
        RoomManager.createRoom(roomID)
    }
    RoomManager.getRoom(roomID)?.addWebsocket(ws)
    ws.on('message', (message: string) => {
        RoomManager.getRoom(roomID)?.broadcast(message)
    })
    ws.on('close', () => {
        RoomManager.getRoom(roomID)?.removeWebsocket(ws)
    })
})


app.get('/api/broadcast/:roomID/key/:key', async (req, res) => {
    const token: string | undefined = req.headers.authorization
    const { roomID, key } = req.params
    if (token === undefined) {
        return res.status(401).send('Unauthorized')
    }
    const tokenPermissions = JSON.parse(await permissionsDB.get(token))
    res.send('Got a GET request')
    console.log(req.body)
    console.log(req.headers)
})


app.post('/api/broadcast', (req, res) => {
    res.send('Got a POST request')
})


app.put('/api/broadcast', (req, res) => {
    res.send('Got a PUT request')
})


app.delete('/api/broadcast', (req, res) => {
    res.send('Got a DELETE request')
})


app.patch('/api/broadcast', (req, res) => {
    res.send('Got a PATCH request')
})
