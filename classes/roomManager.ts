import Room from './room'

export default class RoomManager {
    static rooms: Room[] = []

    static getRoom(roomID: string): Room | undefined {
        return this.rooms.find(room => room.roomID === roomID)
    }

    static createRoom(roomID: string): Room {
        const room = new Room(roomID)
        this.rooms.push(room)
        return room
    }

    static deleteRoom(roomID: string): void {
        const room = this.getRoom(roomID)
        if (room === undefined) {
            return
        }
        this.rooms = this.rooms.filter(room => room.roomID !== roomID)
    }
}
