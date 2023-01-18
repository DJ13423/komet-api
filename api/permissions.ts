import { Express } from 'express'
import { ParsedQs } from 'qs'
import { Level } from 'level'

const app = global.variables.app;
const permissionsDB: Level = global.variables.permissionsDB
const accountsDB: Level = global.variables.accountsDB


app.get('/api/permissions/', async (req, res) => {
    const token: string | undefined = req.headers.authorization
    //const { roomID, key } = req.params
    const tokenToCheck: string | ParsedQs | string[] | ParsedQs[] | undefined = req.query.token
    if (token === undefined) {
        return res.status(401).send('Unauthorized')
    }
    const tokenPermissions = JSON.parse(await permissionsDB.get(token))
    res.send('Got a GET request')
    console.log(req.body)
    console.log(req.headers)
})


app.post('/api/broadcast', (req, res) => {
    res.send('Got a POST request')
})


app.put('/api/broadcast', (req, res) => {
    res.send('Got a PUT request')
})


app.delete('/api/broadcast', (req, res) => {
    res.send('Got a DELETE request')
})


app.patch('/api/broadcast', (req, res) => {
    res.send('Got a PATCH request')
})
