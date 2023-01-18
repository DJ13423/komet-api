import ws from 'ws'

export default class Room {
    roomID: string
    websockets: ws[] = []

    constructor(roomID: string) {
        this.roomID = roomID
    }

    addWebsocket(ws: ws): void {
        this.websockets.push(ws)
    }

    removeWebsocket(ws: ws): void {
        this.websockets = this.websockets.filter(websocket => websocket !== ws)
    }

    broadcast(message: string): void {
        this.websockets.forEach(ws => ws.send(message))
    }

    broadcastJSON(json: any): void {
        this.broadcast(JSON.stringify(json))
    }
}
