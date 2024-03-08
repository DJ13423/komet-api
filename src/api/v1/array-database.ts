import express, { Express } from 'express'


const router = express.Router()


router.get('/:databaseID/:index?', async (req, res) => {
    const { databaseID, index } = req.params
    
    await global.variables.arrayDatabase.get(databaseID, async (err, value) => {
        var databaseData: any = { data: [], dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        if (index == undefined) {
            // send all indexs
            res.status(200)
            res.set('Content-Type', 'application/json')
            res.send(databaseData.data)
        } else {
            // send specific index
            if (databaseData.data[index]) {
                res.status(200)
                res.send(databaseData.data[index])
            }
            else
                res.sendStatus(404)
        }
    })
})


router.put('/:databaseID/:index?', async (req, res) => {
    const { databaseID, index } = req.params
    const data = req.body
    await global.variables.arrayDatabase.get(databaseID, async (err, value) => {
        var databaseData: any = { data: [], dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        if (index == undefined) {
            databaseData.data.push(data)
        } else {
            databaseData.data[index] = data
        }
        
        databaseData.dateUpdated = Date.now()
        await global.variables.arrayDatabase.put(databaseID, JSON.stringify(databaseData))
        res.sendStatus(200)
    })
})


router.delete('/:databaseID/:index', async (req, res) => {
    const { databaseID, index } = req.params
    await global.variables.arrayDatabase.get(databaseID, async (err, value) => {
        var databaseData: any = { data: [], dateCreated: Date.now(), dateUpdated: Date.now() }
        if (!err && value) {
            databaseData = JSON.parse(value)
        }

        if (databaseData.data[index]) {
            delete databaseData.data[index]
        } else {
            res.sendStatus(404)
            return
        }
        
        databaseData.dateUpdated = Date.now()
        await global.variables.arrayDatabase.put(databaseID, JSON.stringify(databaseData))
        res.sendStatus(200)
    })
})


export default router
