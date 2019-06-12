var nodemailer = require('nodemailer');



// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'mail.gmail.com', //TODO we can set this to be mbta smtp
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'email@gmail.com', // generated ethereal user
        pass: 'password'  // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Nodemailer" <emaill@gmail.com>', // sender address
    to: 'email@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: '<h1>Welcome</h1><p>That was easy!</p>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

   // res.render('contact', {msg:'Email has been sent'});
});
