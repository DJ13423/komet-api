import express, { Express } from 'express'
import { Level } from 'level'

const router = express.Router()


router.get('/:databaseID/:index?', async (req, res) => {
    const { databaseID, index } = req.params

    await global.variables.limitedArrayDatabase.get(databaseID, async (err, value) => {
        var databaseData: any = { data: [], dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        if (index == undefined) {
            res.send(databaseData.data)
        } else {
            res.send(databaseData.data[index])
        }
    })
})


router.put('/:databaseID', async (req, res) => {
    const { databaseID } = req.params
    const data = req.body

    await global.variables.limitedArrayDatabase.get(databaseID, async (err, value) => {
        var databaseData: any = { data: [], dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }
        databaseData.data.push(data)
        
        databaseData.dateUpdated = Date.now()
        await global.variables.limitedArrayDatabase.put(databaseID, JSON.stringify(databaseData))
        res.sendStatus(200)
    })
})


export default router
