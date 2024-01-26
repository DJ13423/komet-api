import RoomManager from '../../classes/roomManager'
import express from 'express'

const router = express.Router()


router.ws('/:roomID', (ws, req) => {
    const { roomID } = req.params

    const room = RoomManager.getRoom(roomID)
    room.addWebsocket(ws)

    ws.on('message', (message: string) => {
        room.broadcast(ws.url)
    })

    ws.on('close', () => {
        room.removeWebsocket(ws)
    })
})


router.get('/:roomID/count', (req, res) => {
    const { roomID } = req.params
    const room = RoomManager.getRoom(roomID)
    res.send(room.websockets.length)
})


export default router
