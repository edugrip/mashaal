var nodemailer = require('nodemailer');
module.exports = function(to, subject, content) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tccmailer@gmail.com',
      pass: 'asdf',
    },
  });
  var mailOptions = {
    from: 'tccmailer@gmail.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: content, // plain text bodyf
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log('error');
      return err;
    } else {
      console.log('no error');
      return info;
    }
  });
};
