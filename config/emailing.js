module.exports = function(template_Name,users) {

    const nodemailer = require('nodemailer'),
        //creds = require('./creds'),
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'miagemulhousetest@gmail.com',
                pass: 'miagemulhousetest123',
            },
            tls:{
                rejectUnauthorized: false
            },
        }),
        EmailTemplate = require('email-templates').EmailTemplate,
        path = require('path'),
        Promise = require('bluebird');

    function sendEmail(obj) {
        return transporter.sendMail(obj);
    }

    function loadTemplate(templateName, contexts) {
        let template = new EmailTemplate(path.join('./', 'templates', templateName));
        return Promise.all(contexts.map((context) => {
            return new Promise((resolve, reject) => {
                template.render(context, (err, result) => {
                    if (err) reject(err);
                    else resolve({
                        email: result,
                        context,
                    });
                });
            });
        }));
    }

    loadTemplate(template_Name, users).then((results) => {
        return Promise.all(results.map((result) => {
            sendEmail({
                to: result.context.email,
                from: 'Anciens MIAGE MULHOUSE',
                subject: result.email.subject,
                html: result.email.html,
                text: result.email.text,
            });
        }));
    }).then(() => {
        console.log('Yay!');
    });

}
