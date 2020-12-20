const mailer = require("nodemailer");

const sendMail = (title, description, email) => {
    return new Promise((resolve, reject) => {
        let transport = mailer.createTransport({
            port: 465,
            host: process.env.host,
            secureConnection: true,
            auth: {
                user: process.env.goemail,
                pass: process.env.gopass
            }
        });
        let options = {
            from: process.env.goemail,
            to: email,
            subject: title,
            text: description
        };

        transport.sendMail(options, err => {
            if (err) reject(false);
            else {
                console.log(`Email sent: ${email}`);
                resolve(true);
            }
        });
    });
};

module.exports = sendMail;
