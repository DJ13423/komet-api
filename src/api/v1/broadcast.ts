import RoomManager from '../../classes/roomManager'
import express from 'express'

const router = express.Router()


router.ws('/:roomID', (ws, req) => {
    const { roomID } = req.params

    const room = RoomManager.getRoom(roomID)
    room.addWebsocket(ws)

    ws.on('message', (message: string) => {
        room.broadcast(message)
    })

    ws.on('close', () => {
        room.removeWebsocket(ws)
    })
})


router.get('/:roomID', (req, res) => {
    const { roomID } = req.params
    const room = RoomManager.getRoom(roomID)
    if (room === undefined) {
        res.send('Room not found')
        return
    }

    const dataToSend = {
        roomID: room.id,
        websockets: room.websockets.length,
        websocketsList: room.websockets.map(ws => ws.url)
    }
    res.send(JSON.stringify(dataToSend))
})


export default router
