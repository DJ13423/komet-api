import express, { Express } from 'express'
import { Level } from 'level'

const router = express.Router()


router.get('/:databaseID/:key?', async (req, res) => {
    const { databaseID, key } = req.params
    const databaseData = JSON.parse(await global.variables.database.get(databaseID))
    if (key == undefined) {
        // send all keys
        const keys = databaseData.data
        res.send(keys)
    } else {
        // send specific key
        const value = databaseData.data[key]
        res.send(value)
    }
})


router.put('/:databaseID/:key', async (req, res) => {
    const { databaseID, key } = req.params
    const databaseData = JSON.parse(await global.variables.database.get(databaseID))
    const data = req.body
    databaseData.data[key] = data
    databaseData.dateUpdated = Date.now()
    await global.variables.database.put(databaseID, JSON.stringify(databaseData))
})


export default router
