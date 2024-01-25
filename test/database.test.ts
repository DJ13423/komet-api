import request from "supertest"


function generateRandomString(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    return result
}



describe('Testing storing single value in database endpoint /api/v1/database/', () => {
    const databaseID = generateRandomString(10)
    const key = generateRandomString(10)
    const contentToStore = generateRandomString(10)
    describe(`PUT /api/v1/database/${databaseID}/${key}`, () => {
        test('responds with 200', async () => {
            await request('http://localhost:80')
                .put(`/api/v1/database/${databaseID}/${key}`)
                .set('Content-Type', 'text/plain')
                .send(contentToStore)
                .expect(200)
        })
    })
    describe(`GET /api/v1/database/${databaseID}/${key}`, () => {
        test('responds with 200', async () => { // TODO: make it so we dont make multiple requests
            await request('http://localhost:80')
                .get(`/api/v1/database/${databaseID}/${key}`)
                .expect(200)
        })
        test(`responds with correct stored data (${contentToStore})`, async () => {
            await request('http://localhost:80')
                .get(`/api/v1/database/${databaseID}/${key}`)
                .set('Accept', 'text/plain')
                .expect(contentToStore)
        })
    })
    describe(`DELETE /api/v1/database/${databaseID}/${key}`, () => {
        test('responds with 200', async () => {
            await request('http://localhost:80')
                .delete(`/api/v1/database/${databaseID}/${key}`)
                .expect(200)
        })
    })
})

describe('Testing storing multiple values in database endpoint /api/v1/database/', () => {
    const databaseID = generateRandomString(10)
    const keys = [...Array(10)].map(() => generateRandomString(10))
    const contentToStore = generateRandomString(10)
    for (const key of keys) {
        describe(`PUT /api/v1/database/${databaseID}/${key}`, () => {
            test('responds with 200', async () => {
                await request('http://localhost:80')
                    .put(`/api/v1/database/${databaseID}/${key}`)
                    .set('Content-Type', 'text/plain')
                    .send(contentToStore)
                    .expect(200)
            })
        })
    }
    describe(`GET /api/v1/database/${databaseID}`, () => {
        test('responds with 200', async () => {
            await request('http://localhost:80')
                .get(`/api/v1/database/${databaseID}`)
                .expect(200)
        })
        test('responds with keys', async () => {
            await request('http://localhost:80')
                .get(`/api/v1/database/${databaseID}`)
                .set('Accept', 'application/json')
                .expect(keys)
                .expect('Content-Type', /json/)
        })
    })
    for (const key of keys) {
        describe(`DELETE /api/v1/database/${databaseID}/${key}`, () => {
            test('responds with 200', async () => {
                await request('http://localhost:80')
                    .delete(`/api/v1/database/${databaseID}/${key}`)
                    .expect(200)
            })
        })
    }
})
