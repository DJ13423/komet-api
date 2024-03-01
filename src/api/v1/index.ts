import express from "express"

const router = express.Router()

router.use('/broadcast', require('./broadcast').default)
router.use('/database', require('./database').default)
router.use('/limited-database', require('./limited-database').default)
router.use('/array-database', require('./array-database').default)
router.use('/limited-array-database', require('./limited-array-database').default)

// aliases
router.use('/db', require('./database').default)
router.use('/ldb', require('./limited-database').default)
router.use('/adb', require('./array-database').default)
router.use('/ladb', require('./limited-array-database').default)


export default router
