import { Express } from 'express'
import { Level } from 'level'

const app: Express = global.variables.app;
const permissionsDB: Level = global.variables.permissionsDB

app.get('/api/database/:databaseID/:key?', async (req, res) => {
    const token: string | undefined = req.headers.authorization
    const { databaseID, key } = req.params
    if (token === undefined) {
        return res.status(401).send('Unauthorized')
    }
    const tokenPermissions = JSON.parse(await permissionsDB.get(token))
    JSON.parse(tokenPermissions)
    res.send('Got a GET request')
    console.log(req.body)
    console.log(req.headers)
})


app.post('/api/database', (req, res) => {
    res.send('Got a POST request')
})


app.put('/api/database', (req, res) => {
    res.send('Got a PUT request')
})


app.delete('/api/database', (req, res) => {
    res.send('Got a DELETE request')
})


app.patch('/api/database', (req, res) => {
    res.send('Got a PATCH request')
})
