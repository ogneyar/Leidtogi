
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')
const getDateInName = require("../../service/getDateInName")
const StringDecoder = require('string_decoder').StringDecoder


class TestController {

    async test(req, res) {

        /*
        type:
            catalog - товары (1с присылает данные о товарах)
            sale - заказы (1с запрашивает данные о заказах)

        */
        let { type, mode, filename } = req.query

        let fullPath = ""
        if (req.body && JSON.stringify(req.body) !== "{}") 
        {
            let body = req.body
            await sendMessage("req.body.type === 'Buffer'", false)
            
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))) 
            {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))
            }
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))) 
            {
                fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))
            }

            let dateInName = getDateInName()

            if (filename.includes("import_files")) {
                
                if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'import_files'))) 
                {
                    fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'import_files'))
                }

                let idx = filename.indexOf("/")
                filename = filename.substring(idx+1, filename.length)
                idx = filename.indexOf("/")
                let folderName = filename.substring(0, idx)

                if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'import_files', folderName))) 
                {
                    fs.mkdirSync(path.resolve(__dirname, '..', '..', 'static', 'import_files', folderName))
                }

                filename = filename.substring(idx+1, filename.length)
                fullPath = path.resolve(__dirname, '..', '..', 'static', 'import_files', folderName, filename) 
                try 
                {
                    fs.writeFileSync(fullPath, Buffer.from(body, "base64"))
                    await sendMessage(`Записал данные в файл. Имя файла: ${filename}`, false)
                } 
                catch (err) 
                {
                    await sendMessage(`Записать данные в файл не удалось. Имя файла: ${filename}`, false)
                }
            }else {
                fullPath = path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml', dateInName + "_" + filename) 
                try 
                {
                    let decoder = new StringDecoder('utf8')
                    fs.writeFileSync(fullPath, decoder.write(body))
                } 
                catch (err) 
                {
                    await sendMessage(`Записать данные в файл не удалось. Имя файла: ${filename}`, false)
                }
            }

        }

        // if (type !== "catalog") {
        //     await sendMessage("type: " + type + ", mode: " + mode, false)
        //     return res.json("success")
        // }

        if (mode === "checkauth") 
        {
            await sendMessage("mode: " + mode + ", type: " + type, false)
            return res.send(`success\nkuka\n42`)
        }
        else if (mode === "init") 
        {
            await sendMessage("mode: " + mode + ", type: " + type, false)
            return res.send(`zip=no\nfile_limit=52428800`) // 52 428 800 байт = 50 Мб
        }
        else if (mode === "file") 
        {
            if ( ! fullPath ) await sendMessage("mode: " + mode + ", type: " + type + ", filename: " + filename, false)
        }
        else if (mode === "import") 
        {
            await sendMessage("mode: " + mode + ", type: " + type + " filename: " + filename, false)
        }
        else if (mode === "query") // запрос данных
        {
            await sendMessage("mode: " + mode + ", type: " + type, false)
            return res.send(`
<КоммерческаяИнформация ВерсияСхемы="2.03" ДатаФормирования="2023-03-23">
    <Документ>
        <Ид>20</Ид>
        <Номер>20</Номер>
        <Дата>2023-03-20</Дата>
        <ХозОперация>Заказ товара</ХозОперация>
        <Роль>Продавец</Роль>
        <Валюта>RUB</Валюта>
        <Курс>1</Курс>
        <Сумма>9683.42</Сумма>
        <Контрагенты>
            <Контрагент>
                <Ид>1#admin#Петров Петр</Ид>
                <Наименование>Петр Петров</Наименование>
                <Роль>Покупатель</Роль>
                <ПолноеНаименование>Петр Петров</ПолноеНаименование>
                <Фамилия>Петров</Фамилия>
                <Имя>Петр</Имя>
                <АдресРегистрации>
                    <Представление>87698</Представление>
                    <АдресноеПоле>
                        <Тип>Почтовый индекс</Тип>
                        <Значение>6546</Значение>
                    </АдресноеПоле>
                    <АдресноеПоле>
                        <Тип>Улица</Тип>
                        <Значение>87698</Значение>
                    </АдресноеПоле>
                </АдресРегистрации>
                <Контакты>
                </Контакты>
                <Представители>
                    <Представитель>
                        <Контрагент>
                            <Отношение>Контактное лицо</Отношение>
                            <Ид>ab7399a8aa62c20e0e9f3ea53c6dac81</Ид>
                            <Наименование>Петр Петров</Наименование>
                        </Контрагент>
                    </Представитель>
                </Представители>
 
            </Контрагент>
        </Контрагенты>
 
        <Время>13:50:40</Время>
        <Комментарий></Комментарий>
        <Товары>
            <Товар>
                <Ид>ORDER_DELIVERY</Ид>
                <Наименование>Доставка заказа</Наименование>
                <БазоваяЕдиница Код="796" НаименованиеПолное="Штука" МеждународноеСокращение="PCE">шт</БазоваяЕдиница>
                <ЦенаЗаЕдиницу>348.00</ЦенаЗаЕдиницу>
                <Количество>1</Количество>
                <Сумма>348.00</Сумма>
                <ЗначенияРеквизитов>
                    <ЗначениеРеквизита>
                        <Наименование>ВидНоменклатуры</Наименование>
                        <Значение>Услуга</Значение>
                    </ЗначениеРеквизита>
                    <ЗначениеРеквизита>
                        <Наименование>ТипНоменклатуры</Наименование>
                        <Значение>Услуга</Значение>
                    </ЗначениеРеквизита>
                </ЗначенияРеквизитов>
            </Товар>
            <Товар>
                <Ид>cbcf498f-55bc-11d9-848a-00112f43529a</Ид>
                <ИдКаталога>bd72d8f9-55bc-11d9-848a-00112f43529a</ИдКаталога>
                <Наименование>Комбайн MOULINEX A77 4C</Наименование>
                <БазоваяЕдиница Код="796" НаименованиеПолное="Штука" МеждународноеСокращение="PCE">шт</БазоваяЕдиница>
                <ЦенаЗаЕдиницу>9335.42</ЦенаЗаЕдиницу>
                <Количество>1.00</Количество>
                <Сумма>9335.42</Сумма>
                <ЗначенияРеквизитов>
                    <ЗначениеРеквизита>
                        <Наименование>ВидНоменклатуры</Наименование>
                        <Значение>Товар</Значение>
                    </ЗначениеРеквизита>
                    <ЗначениеРеквизита>
                        <Наименование>ТипНоменклатуры</Наименование>
                        <Значение>Товар</Значение>
                    </ЗначениеРеквизита>
                </ЗначенияРеквизитов>
            </Товар>
        </Товары>
        <ЗначенияРеквизитов>
            <ЗначениеРеквизита>
                <Наименование>Дата оплаты</Наименование>
                <Значение>2023-03-21 15:44:47</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Номер платежного документа</Наименование>
                <Значение>ТК000000026</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Метод оплаты</Наименование>
                <Значение>Наличный расчет</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Дата разрешения доставки</Наименование>
                <Значение>2023-03-21 15:51:27</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Заказ оплачен</Наименование>
                <Значение>true</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Доставка разрешена</Наименование>
                <Значение>true</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Отменен</Наименование>
                <Значение>false</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Финальный статус</Наименование>
                <Значение>true</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Статус заказа</Наименование>
                <Значение>[F] Доставлен</Значение>
            </ЗначениеРеквизита>
            <ЗначениеРеквизита>
                <Наименование>Дата изменения статуса</Наименование>
                <Значение>2007-10-16 15:51:58</Значение>
            </ЗначениеРеквизита>
        </ЗначенияРеквизитов>
    </Документ>
</КоммерческаяИнформация>
            `)
        }
        else if (mode) 
        {            
            await sendMessage("mode: " + mode + ", type: " + type, false)
        }else {
            await sendMessage("type: " + type, false)
        }

        return res.send("success")
    }

}


module.exports = new TestController()