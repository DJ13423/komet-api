import request from "supertest"


function generateRandomString(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    return result
}


describe('Testing endpoint /api/v1/broadcast/', () => {
    describe('GET /api/v1/broadcast/roomID', () => {
        test('responds with json', async () => {
            const response = await request('http://localhost:80')
                .get('/api/v1/broadcast/roomID')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({ roomID: 'roomID', websockets: 0, websocketsList: []})
        })
    })
})


// describe('Testing endpoint /api/v1/broadcast/:roomID', () => {
//     describe('WSS /api/v1/broadcast/:roomID', () => {
//             const roomID = generateRandomString(10)
//         test('Can send WebSocket message', async () => {
//             const ws1 = new WebSocket(`ws://localhost:80/api/v1/broadcast/${roomID}`)
//             const ws2 = new WebSocket(`ws://localhost:80/api/v1/broadcast/${roomID}`)
//             const ws3 = new WebSocket(`ws://localhost:80/api/v1/broadcast/${roomID}`)
//             const ws4 = new WebSocket(`ws://localhost:80/api/v1/broadcast/${roomID}`)

//             const message1 = generateRandomString(10)
//             const message2 = generateRandomString(10)
//             const message3 = generateRandomString(10)
//             const message4 = generateRandomString(10)


//         })
//     })
// })
