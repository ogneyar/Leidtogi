const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT_SECURE,
            // port: process.env.SMTP_PORT,
            // secure: false,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        try {
            let response = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Активация аккаунта на ' + process.env.CORS_URL_SECURE,
                text: '',
                html:
                    `
                        <div>
                            <h1>Для активации перейдите по ссылке</h1>
                            <a href="${process.env.CORS_URL_SECURE}/confirmation/${link}">${process.env.CORS_URL_SECURE}/confirmation/${link}</a>
                        </div>
                    `
            })
            
            return response
        
        }catch(e) {
            return e
        }
    }

    async sendChangePasswordLink(to, link) {
        try {
            let response = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Смена пароля на ' + process.env.CORS_URL_SECURE,
                text: '',
                html:
                    `
                        <div>
                            <h1>Для смены пароля перейдите по ссылке</h1>
                            <a href="${process.env.CORS_URL_SECURE}/change_password/${link}">${process.env.CORS_URL_SECURE}/change_password/${link}</a>
                            <hr />
                            <h3>Если Вы не запрашивали смену пароля, то проигнорируйте это письмо!</h3>
                        </div>
                    `
            })
            return response
        }catch(e) {
            return e
        }
    }

    
    async sendRequestPrice(to, data) { // to - куда отправлять email, data - { name, phone, email, article, nameProduct, url }
        try {
            let response = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Запрос цены на ' + process.env.CORS_URL_SECURE,
                text: '',
                html:
                    `
                    <div>
                        <h1>Клиент запросил цену товара</h1>
                        <hr />
                        <a href="${data.url}">${data.url}</a>
                        <br /><br />
                        <div>
                            <p>Наименование - ${data.nameProduct}</p>
                            <p>Артикул - ${data.article}</p>
                            <p>Бренд - ${data.brand}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Имя клиента - ${data.name}</p>
                            <p>Номер телефона - ${data.phone}</p>
                            <p>Почта - ${data.email}</p>
                        </div>
                    </div>
                    `
            })
            return response
        }catch(e) {
            return e
        }
    }
   
    
    async sendRequestProduct(to, data) { // to - куда отправлять email, data - { name, phone, email, article, nameProduct, url }
        try {
            let response = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Запрос товара на ' + process.env.CORS_URL_SECURE,
                text: '',
                html:
                    `
                    <div>
                        <h1>Клиент запросил товар, которого нет в наличии</h1>
                        <hr />
                        <a href="${data.url}">${data.url}</a>
                        <br /><br />
                        <div>
                            <p>Наименование - ${data.nameProduct}</p>
                            <p>Артикул - ${data.article}</p>
                            <p>Бренд - ${data.brand}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Имя клиента - ${data.name}</p>
                            <p>Номер телефона - ${data.phone}</p>
                            <p>Почта - ${data.email}</p>
                        </div>
                    </div>
                    `
            })
            return response
        }catch(e) {
            return e
        }
    }
    

    async sendRequestProducts_AST(data) { // to - куда отправлять email, data - { name, phone, email, article, nameProduct, url, multiplier, price, quantity, email_from, url }
        try {
            let maillist = [ data.to_admin, ]

            if (data.to_seo) maillist.push(data.to_seo)

            let transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT_SECURE,
                secure: true,
                auth: { user: data.email_from, pass: process.env.SMTP_PASSWORD_AST }
            })
            let response = await transport.sendMail({
                from: data.email_from,
                to: maillist,
                subject: 'Запрос товара на ' + process.env.CORS_URL_A,
                text: '',
                html:
                    `
                    <div>
                        <h1>Клиент запросил товар</h1>
                        <hr />
                        <a href="${data.url}">${data.url}</a>
                        <br /><br />
                        <div>
                            <p>Наименование - ${data.nameProduct}</p>
                            <p>Артикул - ${data.article}</p>
                            <p>В упаковке - ${data.multiplier} шт.</p>
                            <p>Цена - от ${data.price} р.</p>
                            <p>Количество - ${data.quantity} шт.</p>
                            <!--<p>Итого - ${(Number(data.quantity) * Number(data.price))*100/100} р.</p>-->
                        </div>
                        <hr />
                        <div>
                            <p>Имя клиента - ${data.name}</p>
                            <p>Номер телефона - ${data.phone}</p>
                            <p>Почта - ${data.email ? data.email : "не указана"}</p>
                        </div>
                    </div>
                    `
            })
            return response
            
        }catch(e) {
            return e
        }
    }
    

    async sendCallBack_AST(data) { // to - куда отправлять email, data - { name, phone, email_from }
        try {
            let transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT_SECURE,
                secure: true,
                auth: { user: data.email_from, pass: process.env.SMTP_PASSWORD_AST }
            })
            let response = await transport.sendMail({
                from: data.email_from,
                to: data.to_admin,
                subject: 'Запрос обратного звонка на ' + process.env.CORS_URL_A,
                text: '',
                html:
                    `
                    <div>
                        <h1>Клиент запросил звонок</h1>
                        <hr />                    
                        <div>
                            <p>Имя клиента - ${data.name}</p>
                            <p>Номер телефона - ${data.phone}</p>
                        </div>
                    </div>
                    `
            })
            return response
            
        }catch(e) {
            return e
        }
    }


    async sendMessage_AST(data) { // data - { email_from, to, subject, html } // to - куда отправлять email
        try {
            let transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT_SECURE,
                secure: true,
                auth: { user: data.email_from, pass: process.env.SMTP_PASSWORD_AST }
            })
            // console.log("data.email_from ",data.email_from)
            // console.log("data.to ",data.to)
            // console.log("data.subject ",data.subject)
            // console.log("data.html ",data.html)
            let response = await transport.sendMail({
                from: data.email_from,
                to: data.to,
                subject: data.subject,
                text: '',
                html: data.html
            })
            return response
            
        }catch(e) {
            return e
        }
    }

}

// <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
// <html>
//     <head><title>Почтовая рассылка</title></head>
//     <body>

// </body>
// </html>

module.exports = new MailService();
