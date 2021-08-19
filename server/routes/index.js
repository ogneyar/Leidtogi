const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const brandRouter = require('./brandRouter')
const userRouter = require('./userRouter')
const ratingRouter = require('./ratingRouter')
const parserRouter = require('./parserRouter')


router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/rating', ratingRouter)
router.use('/parser', parserRouter)

module.exports = router