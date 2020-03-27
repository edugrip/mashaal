var express = require("express");
var app = express();
var dbUtils = require("../utils/response");
module.exports = function(passport) {
  app.get("/admin-login", async (req, res) => {
    var message = "";
    if (!req.user) {
      //  console.log("req.flash..",req.loginErrors)
      message = "Login failed!";
    }
    res.render("login", { message: req.flash("error"),role:"admin"});
  });

  app.get("/login", async (req, res) => {
    var message = "";
    if (!req.user) {
      //  console.log("req.flash..",req.loginErrors)
      message = "Login failed!";
    }
    res.render("login", { message: req.flash("error"),role:"user" });
  });

  app.post("/user-login", passport.authenticate("local-login"), (req, res) => {
    res.redirect(req.session.redirectTo || "/index");
  });

  app.post(
    "/admin-login",
    passport.authenticate("local-login", {
      successRedirect: "admin/dashboard",
      failureRedirect: "/admin-login",
      failureFlash: true
    }),
    async function(req, res) {
      var message = "logged in successfully";
      res.render("/dashboard");
    }
  )

  app.get("/logout", async (req, res) => {
    cookie = req.cookies;
    for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
        continue;
      }
      res.cookie(prop, "", { expires: new Date(0) });
    }
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if (err) {
          return next(err);
        } else {
          req.logout();
          res.redirect("/login");
        }
      });
    }
  });

  app.get("/send_complaint", async (req, res) => {
    var user = req.user
    if(req.user){
      res.render("send_complaint",{status:1,user});
    }else{
    res.render("send_complaint");
    }
  });
  app.get("/career_guidance", async (req, res) => {
    var user = req.user
    if(!req.user){
    res.render("career_guidance",{user});
    }else{
      res.render("career_guidance"); 
    }
  });

  app.get("/index", async (req, res) => {
    var user = req.user
    if(!req.user){
    res.render("index");
    }else{
      res.render("index",{user});
    }
  });

  return app;
};
