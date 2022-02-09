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

}

module.exports = new MailService();
