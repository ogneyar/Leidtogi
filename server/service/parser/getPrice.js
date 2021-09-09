function getPrice(string, article = 0) {

    if (!string) return {error:"Функции getPrice передана пустая строка",string}

    let lengthString, serchString, lengthSerchString, number

    lengthString = string.length
    serchString = `<p class="price">`
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найдена цена у артикула '${article}'`,string}
    string = string.substring(number, lengthString)

    lengthString = string.length
    serchString = `<span`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найдена строка '${serchString}' у артикула '${article}'`,string}
    string = string.substring(number + lengthSerchString, lengthString)

    lengthString = string.length
    serchString = `>`
    lengthSerchString = serchString.length
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найдена строка '${serchString}' у артикула '${article}'`,string}
    string = string.substring(number + lengthSerchString, lengthString)

    serchString = `р.</span>`
    number = string.indexOf(serchString)
    if (number === -1) return {error:`Не найдена строка '${serchString}' у артикула '${article}'`,string}
    string = string.substring(0, number).trim()

    if (!string) return {error:`Не сработал substring после найденого '${serchString}' у артикула '${article}'`,string}
    
    return {message:string}
}

module.exports = getPrice