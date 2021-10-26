const XLSX = require('xlsx')

const { Product, ProductInfo, Brand, Category } = require('../../models/models')

const getAllData = require('../parser/milwaukee/getAllData.js')
const createProduct = require('../product/createProduct.js')


async function addNewProduct(workbook, brandName, number) {
    
    // let brandName = "MILWAUKEE".toLowerCase()
    
    if (!workbook) workbook = XLSX.readFile('newMILWAUKEE.xlsx')

    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];

    let address_of_article = 'J'+number;
    let address_of_name = 'K'+number;
    let address_of_category = 'P'+number;

    let desired_article = worksheet[address_of_article];
    let desired_name = worksheet[address_of_name];
    let desired_category = worksheet[address_of_category];

    /* Get the value */
    let article = (desired_article ? desired_article.v : undefined);
    let name = (desired_name ? desired_name.v : undefined);
    let categoryUrl = (desired_category ? desired_category.v : undefined);


    if (article) {
        const oldProduct = await Product.findOne({
            where: {article}
        })
        if (oldProduct) {
            const productInfo = await ProductInfo.findOne({
                where: {productId:oldProduct.id,title:"description"}
            })
            if (productInfo && oldProduct.price) return `Товар с артикулом ${article} уже существует!`
        }
    }

    let response = await getAllData(brandName, article)

    if (response.error) return response.error

    let {images, sizes, price, description, characteristics, equipment} = response

    let have = 1
    let promo = ""
    let country = "Германия"

    const brand = await Brand.findOne({
        where: {name:brandName}
    })
    let brandId = brand.id

    const category = await Category.findOne({
        where: {url:categoryUrl}
    })
    let categoryId = category.id

    let files = JSON.stringify(images)

    let desc, charac, equip = null
    if (description) desc = {"title":"description","body":description}
    if (characteristics) charac = {"title":"characteristics","body":characteristics}
    if (equipment) equip = {"title":"equipment","body":equipment}

    let info = JSON.stringify([desc,charac,equip])

    let size = JSON.stringify(sizes)

    return await createProduct(name, price, have, article, promo, country, brandId, categoryId, files, info, size)

}

module.exports = addNewProduct