import express from "express"

const router = express.Router()

router.use('/broadcast', require('./broadcast').default)
router.use('/database', require('./database').default)
router.use('/no-delete-database', require('./no-delete-database').default)


export default router
