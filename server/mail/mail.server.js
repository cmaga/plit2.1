var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'christophernm1999@gmail.com',
        pass: 'Chrisroxs753!'
    }
});

var mailOptions = {
    from: 'christophernm1999@gmail.com',
    to: 'cmagana@mbta.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(`${error} this is an error from node`);
    } else {
        console.log('Email sent: ' + info.response);
    }
});