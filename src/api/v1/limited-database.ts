import express, { Express } from 'express'
import { Level } from 'level'

const router = express.Router()


router.get('/:databaseID/:key?', async (req, res) => {
    const { databaseID, key } = req.params

    await global.variables.limitedDatabase.get(databaseID, async (err, value) => {
        var databaseData: any = { data: {}, dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

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
})


router.put('/:databaseID/:key', async (req, res) => {
    const { databaseID, key } = req.params
    const data = req.body
    

    await global.variables.limitedDatabase.get(databaseID, async (err, value) => {
        var databaseData: any = { data: {}, dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        if (databaseData.data[key]) {
            res.sendStatus(401)
            return
        } else {
            databaseData.data[key] = data
        }
        
        databaseData.dateUpdated = Date.now()
        await global.variables.limitedDatabase.put(databaseID, JSON.stringify(databaseData))
        res.sendStatus(200)
    })
})


export default router
