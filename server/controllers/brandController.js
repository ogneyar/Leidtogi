const {Brand} = require('../models/models')
const ApiError = require('../error/apiError')


class BrandController {

    async create(req, res) {
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json([brand]) // return array
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода create!'));
        }
    }

    async getAll(req, res) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands) // return array
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода getAll!'));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const brand = await Brand.destroy({
                where: {id}
            })
            return res.json(brand) // return boolean
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода delete!'));
        }
    }
    
    async edit(req, res) {
        try {
            const {id} = req.params
            const body = req.body
            const brand = await Brand.update(body, {
                where: { id }
            })
            return res.json(brand) // return boolean
        }catch(e) {
            next(ApiError.badRequest('Ошибка метода edit!'));
        }
    }


}

module.exports = new BrandController()