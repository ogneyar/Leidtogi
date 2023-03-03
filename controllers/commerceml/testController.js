
const axios  = require("axios")
const sendMessage = require("../../service/telegram/sendMessage")
const fs = require('fs')
const path = require('path')


class TestController {

    async test(req, res) {

        let { type, mode, filename } = req.query
        let file = req.files && req.files[0] || undefined
        
        if (file && file.name !== undefined) {
            if (file.name === "import.xml") sendMessage("file.name = import.xml")
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp'))
            if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml'))) fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'static', 'temp', 'advanta'))
            let fullPath = path.resolve(__dirname, '..', '..', 'static', 'temp', 'commerceml', file.name)
            await file.mv(fullPath)
        }

        // sendMessage(JSON.stringify(req.query))

        if (type !== "catalog") return res.json("success")

        if (mode === "checkauth") {
            sendMessage("checkauth")
            return res.send(`success\nkuka\n42`)
        }
            
        if (mode === "init") {
            sendMessage("init")
            return res.send(`zip=no\nfile_limit=50`)
        }
            
        if (mode === "file") {
            sendMessage("mode: " + mode + " filename: " + filename)
            return res.send(`success`)
        }
            
        if (mode === "import") {
            sendMessage("mode: " + mode + " filename: " + filename)
            return res.send(`success`)
        }


        return res.send("success")
    }

}


module.exports = new TestController()