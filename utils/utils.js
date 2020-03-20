const { database } = require("./db");
var fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const esclient = require("./connection");
const nodemailer = require("nodemailer");

verifyToken = async (token, secret, callback) => {
    jwt.verify(token, secret, async function(err, decoded) {
      if (err) {
        callback(err, null);
      } else {
        var user = await callback(null, decoded);
        return user;
      }
    })
}

sendMail = async function(sender_email, token) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    var msg = {
      to: sender_email,
      from: 'test@example.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<a href="${process.env.BASE_URL}/blog/verify?token=${token}">Click here to verify.</a>`,
    
    };
    return sgMail.send(msg);
    
    };

createDir = directory => {
    var success;
  
    fs.ensureDir(directory, err => {
      console.log(err); // => null
      if (err) return false;
      else return true;
      // dir has now been created, including the directory it is to be placed in
    });
  };
  ensureLoggedIn = function(req, res, next) {
    var token = req.headers.authorization
      ? req.headers.authorization
      : req.cookies.token
      ? req.cookies.token
      : null;
  
    if (token !== "Bearer undefined" && token !== "undefined" && token) {
      console.log(typeof token);
      token = token.substring(7, token.length);
      jwt.verify(token, config.secret, async function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate.",
            err: err
          });
          return;
        } else console.log(decoded);
        var user = require("../models/user");
  
        user = await user.findById(decoded.id);
  
        req.user = user;
        next();
      });
    } else {
      console.log("User not logged in");
      next();
    }
  };
  setRedirectPath = (req, res, next) =>{
    req.session.redirectTo = req.originalUrl
    next();
  }
  module.exports = {
    createDir,
    ensureLoggedIn,
    sendMail,
    verifyToken,
    setRedirectPath,
  }