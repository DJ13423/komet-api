import Room from './room'

export default class RoomManager {
    static rooms: Room[] = []

    static getRoom(roomID: string): Room {
        const existingRoom = this.rooms.find(room => room.id === roomID)

        // If a room with the ID exists, return that room
        if (existingRoom) {
            return existingRoom
        }

        // If no room with the ID exists, create a new room
        const room = new Room(roomID)
        this.rooms.push(room)
        return room
    }

    static deleteRoom(roomID: string): void {
        const room = this.getRoom(roomID)
        room.websockets.forEach(ws => room.removeWebsocket(ws))
        this.rooms = this.rooms.filter(room => room.id !== roomID)
    }
}
