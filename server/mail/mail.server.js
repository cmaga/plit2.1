let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    },
    secureConnection: false,
    port: 587,
    auth: {
        user: 'email@email.com',
        pass: 'password'
    }
});

let mailOptions = {
    from: 'hichris12009@hotmail.com',
    to: 'christophernm1999@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});