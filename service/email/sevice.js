const Mailgen = require('mailgen');


class EmailService {
    constructor(sender) {
this.sender = sender;
        this.linc = 'https://0203-31-43-109-215.eu.ngrok.io' 
        this.mailgen = new Mailgen({
            theme: 'default',
            product: {
                name: 'Name devers',
                link: this.linc,
            },
        });
    }




createEmailTempLate(username, token) { 
    const email = {
        body: {
            name: username,
            intro: 'Welcome to Name devers! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `${this.linc}/api/auth/verify-email/${token}`,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        },
    };
    return this.mailgen.generate(email);
}
    

    async sendEmail(email, username, token) {
        const emailTemplate = this.createEmailTempLate(username, token);
        const massage = {
            to: email,
            subject: 'welcome to Name devers',
            html: emailTemplate,
        }
     
            const result = await this.sender.send(massage);
     return result;

};
}
module.exports = EmailService;