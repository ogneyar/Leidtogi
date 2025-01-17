
const Router = require('express')
const router = new Router()
const stalexController = require('../../controllers/parser/stalexController')
const checkRole = require('../../middleware/checkRoleMiddleware')


if (process.env.URL === "http://localhost:5000") {
    router.get('/', stalexController.stalex) // добавление нового товара или обновление цен
}
router.post('/', checkRole("ADMIN"), stalexController.stalex) // добавление нового товара или обновление цен



module.exports = router
