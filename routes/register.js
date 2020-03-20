var express = require('express');
var app = express();
var dbUtils = require('../utils/response');
var config = require("../config/config");
var jwt = require("jsonwebtoken");
var utils = require("../utils/utils");
var owasp = require("owasp-password-strength-test");
module.exports = function(passport) {
    app.get("/", async (req, res) => {
        res.render("register");
      });
    
      app.post("/register", async function(req, res, next) {
        try {
          var checkEmail = ([err, data] = await dbUtils.try(
            "SELECT count(id) as ids FROM users where email = ? ",
            [req.body.email],
            1
          ));
          if (err) {
            var err = await dbUtils.getUserReadableError(res, err);
            throw new Error(err);
          }
          var checkEmail = checkEmail[1];
          if (checkEmail.ids < 1) {
            // var token = crypto.createHash('sha256').update(req.body.email).digest('base64');
            var token = jwt.sign({ email: req.body.email }, config.jwt_secret, {
              expiresIn: 3000000
            });
            if (!err) {
              var fld = {
                email: req.body.email,
                token: token
              };
              var email_response = await utils.sendMail(req.body.email, token);
              var query = "INSERT INTO users  SET ? ";
              if (!email_response.error) {
                var results = ([err, data] = await dbUtils.try(query, [fld]));
                if (err) {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  var obj = { success: 0, message: "Registration Failed!! " };
                  res.end(JSON.stringify(obj));
                } else {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  var obj = {
                    success: 1,
                    message: "Registration Done Successfully please check email !!"
                  };
                  res.end(JSON.stringify(obj));
                }
              } else {
                var obj = {
                  success: 0,
                  message: (process.env.ENV = "prod"
                    ? "Something Went Wrong"
                    : email_response.error)
                };
                res.end(JSON.stringify(obj));
              }
            } else {
              var obj = { success: 0, message: "Something went wrong!! " };
              res.end(JSON.stringify(obj));
            }
          } else {
            var obj = {
              success: 0,
              message:
                "Email already registered please check and try again later..!! "
            };
            res.end(JSON.stringify(obj));
          }
        } catch (error) {
          res.json("Error :" + error);
        }
      });
      app.get("/verify", async function(req, res, next) {
        try {
          var token = await utils.verifyToken(
            req.query.token,
            config.jwt_secret,
            async function(err, decoded) {
              var email = decoded.email;
              var user = ([err, data] = await dbUtils.try(
                "SELECT * from `users`  where `email` = ?",
                [email],
                1
              ));
              var user = user[1];
              var email = user.email;
              var id = user.id;
              if (user) {
                var verified = 1;
                var emailVerify = ([err, data] = await dbUtils.try(
                  "UPDATE `users` SET `verified`= ?  where email = ? && id = ? ",
                  [verified, email, id]
                ));
                if (!err) {
                  var obj = {
                    success: true,
                    message: "Email verified.",
                    token: user.token,
                    email: email
                  };
                  res.render("set_password", { obj });
                } else {
                  var obj = {
                    success: 0,
                    message:
                      "Email not verified please check and try again later..!!"
                  };
                  res.end(JSON.stringify(obj));
                }
              }
            }
          );
        } catch (err) {
          res.json("Error :" + err);
        }
      });
      app.post("/userdata", async function(req, res, next) {
        // console.log('hi')
        try {
            var result = owasp.test(req.body.password);
            if (result.errors.length == 0) {
              var token = await utils.verifyToken(
                req.body.token,
                config.jwt_secret,
                async function(err, decoded) {
                  var email = decoded.email;
                  console.log(email);
                  
                  var user = ([
                    err,
                    data
                  ] = await dbUtils.try(
                    "UPDATE `users` SET `name`= ?,`password` = ? where `email` = ?",
                    [req.body.username, req.body.password,email]
                  ));
                  if (err) {
                    var err = await dbUtils.getUserReadableError(res, err);
                    throw new Error(err);
                  }
                  else{
                    var obj = {
                      success: 1,
                      message: "Password successfully Updated"
                    };
                    res.end(JSON.stringify(obj));
                  }
                }
              );
            } // if password is valid
            else {
              var obj = {
                success: false,
                message: "Invalid password, Please correct the errors!",
                errors: result.errors
              };
              res.end(JSON.stringify(obj));
            }
        } catch (error) {
          res.json("Error :" + error.message);
        }
      });
    return app;
}