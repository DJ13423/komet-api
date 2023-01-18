import { Express } from 'express'
import { Level } from 'level'

const app = global.variables.app;
const permissionsDB: Level = global.variables.permissionsDB
const accountsDB: Level = global.variables.accountsDB


app.post('/api/signup', (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    accountsDB.put(req.body.email, req.body.password)
    res.send('Got a POST request')
})
