const Router = require('express')
const router = new Router()
const parserController = require('../controllers/parserController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/images', checkRole('ADMIN'), parserController.getImages) // парсер изображений с http://vseinstrumenti.ru
router.get('/sizes', checkRole('ADMIN'), parserController.getSizes) // парсер габаритов с http://vseinstrumenti.ru
router.get('/price', checkRole('ADMIN'), parserController.getPrice) // парсер цены с http://mlk-shop.ru
router.get('/description', checkRole('ADMIN'), parserController.getDescription) // парсер описания с http://mlk-shop.ru
router.get('/characteristics', checkRole('ADMIN'), parserController.getCharacteristics) // парсер характеристик с http://mlk-shop.ru
router.get('/equipment', checkRole('ADMIN'), parserController.getEquipment) // парсер комплектации с http://mlk-shop.ru
router.get('/all', checkRole('ADMIN'), parserController.getAll)

router.get('/xlsx', parserController.parseXLSX)

router.get('/mail.ru', parserController.mailRu)
router.get('/ya.ru', parserController.yaRu)

module.exports = router