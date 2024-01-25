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
