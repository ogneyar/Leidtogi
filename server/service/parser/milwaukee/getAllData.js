const axios = require('axios')

const getUrlVseinstrumenti = require('./getUrlVseinstrumenti.js')
const getArrayImages = require('./getArrayImages.js')
const getSizes = require('./getSizes.js')
const getPrice = require('./getPrice.js')
const getUrlMlkShop = require('./getUrlMlkShop.js')
const getDescription = require('./getDescription.js')
const getCharacteristics = require('./getCharacteristics.js')
const getEquipment = require('./getEquipment.js')


async function getAllData(article) {

    let response, Html, images, sizes, price, description, characteristics, equipment
    let urlMlkShop, string

    // https://rostov.vseinstrumenti.ru/search_main.php?what=4933471077
    await axios.get('https://rostov.vseinstrumenti.ru/search_main.php', {params: {
        what: article
    }}).then(res => Html = res.data)

    Html = getUrlVseinstrumenti(Html, article)

    if (!Html) return {error:`getUrlVseinstrumenti не вернула результат поиска по артикулу ${article}`}

    // https://rostov.vseinstrumenti.ru/instrument/akkumulyatornyj/shlifmashiny/bolgarki-ushm/milwaukee/m18-fhsag125-xb-0x-fuel-4933471077/
    response = "https://rostov.vseinstrumenti.ru" + Html

    await axios.get(response)
    .then(res => Html = res.data)

    if (!Html) return {error:"Запрос axios.get(https://rostov.vseinstrumenti.ru) не вернул результат"}
            
    images = getArrayImages(article, Html)

    if (!images[0]) return {error:'Нет фотографий товара',string:images}

    sizes = getSizes(Html)

    // https://mlk-shop.ru/search?search=4933451439
    await axios.get('https://mlk-shop.ru/search', {params: {
        search: article
    }}).then(res => Html = res.data)

    if (!Html) return {error:'Не сработал axios.get(https://mlk-shop.ru/search)',string:Html}

    price = getPrice(Html,article)
    if (price.error) return price
    else price = price.message

    string = getUrlMlkShop(Html)

    if (string.error !== undefined) return string
    else urlMlkShop = string.message

    // https://mlk-shop.ru/akkumulyatornaya-uglovaya-shlifovalnaya-mashina-ushm-bolgarka-milwaukee-m18-fuel-cag125x-0x?search=4933451439
    await axios.get(urlMlkShop).then(res => string = res.data)

    if (!string) return {error:`Не сработал axios.get(${urlMlkShop})`}

    description = getDescription(string)
    // if (description.error) return description
    if (description.error) description = ""
    else description = description.message

    characteristics = getCharacteristics(string)
    // if (characteristics.error) return characteristics
    if (characteristics.error) characteristics = ""
    else characteristics = characteristics.message

    equipment = getEquipment(string)
    // if (equipment.error) return equipment
    if (equipment.error) equipment = ""
    else equipment = equipment.message


    return {images, sizes, price, description, characteristics, equipment}
}


module.exports = getAllData