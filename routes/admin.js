var express = require("express");
var app = express();
var dbUtils = require("../utils/response");
var config = require("../config/config");
var jwt = require("jsonwebtoken");
var utils = require("../utils/utils");
var owasp = require("owasp-password-strength-test");
module.exports = function(passport) {

    app.get('/dashboard',async(req,res)=>{
        res.render("admin/dashboard")
    })
    app.get('/all_complaint',async(req,res)=>{
        try{
        var complaints = ([
            err,
            data
          ] = await dbUtils.try(`select q.*, u.email from user_queries q, users u where u.id=q.user_id`));
        var complaints = complaints[1]
        if (err) {
            var err = await dbUtils.getUserReadableError(res, err);
            throw new Error(err);
          }
          
        res.render("admin/all_complaint",{complaints})
        }catch(err){
            res.send(err)
        }
    })
    app.get('/edit_complaint',async(req,res)=>{
        try{
        var complaints = ([
            err,
            data
          ] = await dbUtils.try(`select * from user_queries where id=${req.query.id}`));
        var complaints = complaints[1]
        if (err) {
            var err = await dbUtils.getUserReadableError(res, err);
            throw new Error(err);
          }
        res.render("admin/edit_complaint",{complaints})
    }catch(err){
        res.send(err)
    }
    })

    app.post('/edit_complaint',async(req,res)=>{
        try{
        var fld = {
            complaint:req.body.complaint,
        }
        var query = `update user_queries  SET ? WHERE id = ${req.body.id}`;
      var complaints = ([err, data] = await dbUtils.try(query, [fld]));
          if (err) {
            var err = await dbUtils.getUserReadableError(res, err);
            throw new Error(err);
          }else{
            res.send("Complaint updated successfully")
          }
        }catch(err){
            res.send(err)
        }
    })
    app.get('/complaint_approve',async(req,res)=>{
      try{
      var fld = {
          status:1,
      }
      var query = `update user_queries  SET ? WHERE id = ${req.query.id}`;
    var complaints = ([err, data] = await dbUtils.try(query, [fld]));
        if (err) {
          var err = await dbUtils.getUserReadableError(res, err);
          throw new Error(err);
        }else{
          res.send("Complaint updated successfully")
        }
      }catch(err){
          res.send(err)
      }
  })
  app.get('/complaint_reject',async(req,res)=>{
    try{
      var fld = {
        status:2,
    }
    var query = `update user_queries  SET ? WHERE id = ${req.query.id}`;
  var complaints = ([err, data] = await dbUtils.try(query, [fld]));
      if (err) {
        var err = await dbUtils.getUserReadableError(res, err);
        throw new Error(err);
      }else{
        res.send("Complaint updated successfully")
      }
    }catch(err){
        res.send(err)
    }
})

    return app; 
}