import ws from 'ws'

export default class Room {
    id: string
    websockets: ws[] = []

    constructor(roomID: string) {
        this.id = roomID
    }

    addWebsocket(ws: ws): void {
        this.websockets.push(ws)
    }

    removeWebsocket(ws: ws): void {
        if (ws.readyState === ws.OPEN)
            ws.close()
        this.websockets = this.websockets.filter(websocket => websocket !== ws)
    }

    broadcast(message: string): void {
        this.websockets.forEach(ws => ws.send(message))
    }
}
