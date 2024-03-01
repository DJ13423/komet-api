const kometApi = require('./kometApi.js');


const api = kometApi.Client('localhost:8080')

const db = api.Database(123)

db.setKey('key', 'value')

const broadcastClient = api.Broadcast(123)

broadcastClient.connect()

broadcastClient.send('message')

broadcastClient.addEventListener('message', (message) => {
    console.log(message)
})
