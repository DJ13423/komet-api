import express, { Express } from 'express'


const router = express.Router()


router.get('/:databaseID/:key?', async (req, res) => {
    const { databaseID, key } = req.params
    
    await global.variables.database.get(databaseID, async (err, value) => {
        var databaseData: any = { data: {}, dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        if (key == undefined) {
            // send all keys
            res.status(200).set('Content-Type', 'application/json').send(Object.keys(databaseData.data))
        } else {
            // send specific key
            if (databaseData.data[key])
                res.status(200).send(databaseData.data[key])
            else
                res.sendStatus(404)
        }
    })
})


router.put('/:databaseID/:key', async (req, res) => {
    const { databaseID, key } = req.params
    await global.variables.database.get(databaseID, async (err, value) => {
        var databaseData: any = { data: {}, dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        const data = req.body
        databaseData.data[key] = data
        
        databaseData.dateUpdated = Date.now()
        await global.variables.database.put(databaseID, JSON.stringify(databaseData))
        res.sendStatus(200)
    })
})


router.delete('/:databaseID/:key', async (req, res) => {
    const { databaseID, key } = req.params
    await global.variables.database.get(databaseID, async (err, value) => {
        var databaseData: any = { data: {}, dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        if (databaseData.data[key]) {
            delete databaseData.data[key]
        } else {
            res.sendStatus(404)
            return
        }
        
        databaseData.dateUpdated = Date.now()
        await global.variables.database.put(databaseID, JSON.stringify(databaseData))
        res.sendStatus(200)
    })
})


export default router
