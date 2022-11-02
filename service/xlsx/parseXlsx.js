
const XLSX = require('xlsx')
const fs = require('fs')

/*
file                файл
arraySearch         массив искомых значений

при повторяющихся значениях вернётся массив
*/
async function parseXlsx(file, arraySearch) {

    let workbook, worksheet, response = []
    
    if (fs.existsSync(file)) {
        workbook = XLSX.readFile(file)
    }else {
        return { error: `Файл ${file} отсутствует или пуст!` }
    }

    let first_sheet_name = workbook.SheetNames[0] // наименование первой вкладки
    worksheet = workbook.Sheets[first_sheet_name] // рабочая вкладка

    let start, symbol = []
    
    let array = [
        "A",   "B",  "C",  "D",  "E",  "F",  "G",  "H",  "I",  "J",  "K",  "L",  "M",  "N",  "O",  "P",  "Q",  "R",  "S",  "T",  "U",  "V",  "W",  "X",  "Y",  "Z",
        "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ",
        "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ"
    ]
    // цикл строк
    for (let number = 1; number <= 20; number++) {
        // остановка цикла если найдена строка наименований
        if (symbol.length > 0 && symbol.length === arraySearch.length) break
        // цикл столбцов
        for (let i = 0; i < array.length; i++) {

            let address = array[i] + number // A1, B1, .., K1, A2, B2, ... 
            let desired = worksheet[address] // искомое
            let value = (desired ? desired.v : undefined)

            // поиск названий столбцов
            if (value && typeof(value) === "string") {
                // цикл значений arraySearch
                for (let numberObject = 0; numberObject < arraySearch.length; numberObject++) {
                    // if (value.includes(arraySearch[numberObject])) {
                    if (value.trim() === arraySearch[numberObject]) {
                        if (!start) start = number + 1
                        if (symbol[numberObject]) {
                            if (Array.isArray(symbol[numberObject])) {
                                symbol[numberObject].push(array[i])
                            }else {
                                let temp = []
                                temp.push(symbol[numberObject])
                                temp.push(array[i])
                                symbol[numberObject] = temp
                            }
                        }else
                            symbol[numberObject] = array[i] 
                    }
                } 

            }

        }
    }
    let yes = true // да, не найден конец строки
    let one = false // найдена ли одна пустая строка?
    let i = 1
    while(yes) {
        let object = {}
        let end = 0
        for (let numberObject = 0; numberObject < arraySearch.length; numberObject++) {
            let text
            if (Array.isArray(symbol[numberObject])) {
                let end_two = 0
                object[arraySearch[numberObject]] = []
                for (let j = 0; j < symbol[numberObject].length; j++) {
                    text = worksheet[ symbol[numberObject][j] + ( start + Number(i) - 1 ) ]
                    if (text) object[arraySearch[numberObject]].push(text.v.toString().trim())
                    else {
                        object[arraySearch[numberObject]].push("")
                        end_two++
                    }
                }
                if (end_two === symbol[numberObject].length) end++
            }else {
                text = worksheet[ symbol[numberObject] + ( start + Number(i) - 1 ) ]
                if (text) object[arraySearch[numberObject]] = text.v.toString().trim()
                else {
                    object[arraySearch[numberObject]] = ""
                    end++
                }
            }
            if (end === arraySearch.length) yes = false 
        }

        if (yes) {
            response.push(object)
            one = false // не найдена пустая строка
        }else {
            if ( ! one ) { // если до этого небыло найдено ни одной пустой строки
                one = true
                yes = true
            }
        }
        i++
    }

    return response

}

module.exports = parseXlsx