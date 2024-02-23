import express from "express"

const router = express.Router()

router.use('/broadcast', require('./broadcast').default)
router.use('/database', require('./database').default)
router.use('/no-delete-database', require('./no-delete-database').default)

// aliases
router.use('/db', require('./database').default)
router.use('/nddb', require('./no-delete-database').default)
router.use('/no-delete-db', require('./no-delete-database').default)
router.use('/no-del-db', require('./no-delete-database').default)


export default router
