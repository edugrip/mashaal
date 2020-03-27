var express = require("express");
var app = express();
var dbUtils = require("../utils/response");
var config = require("../config/config");
var jwt = require("jsonwebtoken");
var utils = require("../utils/utils");
var owasp = require("owasp-password-strength-test");
var middlewares = require('../utils/middlewares')
module.exports = function(passport) {
  app.get("/submit_complaint",middlewares.save_complaint, async (req, res) => {
    var user = req.user
    var complaint = ([err, data] = await dbUtils.try(
      `SELECT * from user_queries where user_id = ?`,
      [req.user]
    ));
    var complaint = complaint[1];
    res.render("complaint_success",{complaint,user});
  });
  app.get("/view_complaint", async (req, res) => {
    var user = req.user
    var complaint = ([err, data] = await dbUtils.try(
      `SELECT * from user_queries where user_id = ?`,
      [req.user]
    ));
    var complaint = complaint[1];
    res.render("complaint_success",{complaint,user});
  });
  app.get("/complaint_details", async (req, res) => {
    var user = req.user
    if(req.query.page){
    var comments = ([err, data] = await dbUtils.try(
      `SELECT * from query_comments where query_id = ? LIMIT 10 OFFSET ?`,
      [req.query.id,req.query.page*10]
    ));

    var comments = comments[1]
    comment = []
    comment = comments
    var comments_count = comments.length
    for (i = 0; i < comments_count; i++) {
      var count_reply = ([err, data] = await dbUtils.try(
        `SELECT ifnull(count(id),0) as ids from query_comments where parent = ?`,
        [comments[i].id]
      ));
      comment.push(count_reply[1])
    }
    var complaint = ([err, data] = await dbUtils.try(
      `SELECT * from user_queries where user_id = ?`,
      [req.user]
    ));
    }else{
      var comments = ([err, data] = await dbUtils.try(
        `SELECT * from query_comments where query_id = ? LIMIT 10`,
        [req.query.id]
      ));
      var comments = comments[1]
      comment = []
      comment = comments
      comments.forEach(async (comments, index) => {
        var count_reply = ([err, data] = await dbUtils.try(
          `SELECT ifnull(count(id),0) as ids from query_comments where parent = ?`,
          [comments.id]
        ));
        var count_reply = count_reply[1]
        comment[index].count_reply = count_reply;
        if (index == comments.length - 1) 
        var comment = comment
      })
      // console.log(comment);
      var complaint = ([err, data] = await dbUtils.try(
        `SELECT * from user_queries where id = ?`,
        [req.query.id]
      ));
    }
    var complaint = complaint[1];
    res.render("complaint_details",{comment,complaint,user});
  });
  return app;
};
