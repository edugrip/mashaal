var express = require("express");
var app = express();
var session = require("express-session");
var dbUtils = require("../utils/response");

save_complaint = async (req, res, next) => {
  try{
  if (!req.user) {
    var fld = {
      email: req.cookies["connect.sid"],
      complaint: req.query.complaint
    };
    var query = "INSERT INTO temporary_queries  SET ? ";
    var complaint = ([err, data] = await dbUtils.try(query, [fld]));
    if (err) {
      var err = await dbUtils.getUserReadableError(res, err);
      throw new Error(err);
    } else {
      var set_url = req.originalUrl.split("?");
      var url = set_url[0];
      req.session.redirectTo = url;
      next();
    }
  } else {
    var complaint = ([
      err,
      data
    ] = await dbUtils.try(`SELECT * from temporary_queries where email = ?`, [
      req.cookies["connect.sid"]
    ]));
    var complaint = complaint[1];
    if(complaint.length){
    var fld = {
      user_id: req.user,
      complaint: complaint[0].complaint
    };
    var query = "INSERT user_queries  SET ? ";
    var user = ([err, data] = await dbUtils.try(query, [fld]));
    if (err) {
      console.log(err);
      var err = await dbUtils.getUserReadableError(res, err);
      throw new Error(err);
    }else{
      var query = "DELETE FROM `temporary_queries` WHERE email = ?"
      var user = ([err, data] = await dbUtils.try(query, [req.cookies["connect.sid"]]));
    }
    next();
  }else{
    var fld = {
      email: req.user,
      complaint: req.query.complaint
    };
    var query = "INSERT INTO user_queries  SET ? ";
    var complaint = ([err, data] = await dbUtils.try(query, [fld]));
    if (err) {
      var err = await dbUtils.getUserReadableError(res, err);
      throw new Error(err);
    }
    next()
  }
  }
  }catch(err){
    console.log(err);
    
  }

};
// setRedirectPath = async (req) =>{
//   req.session.redirectTo = req.originalUrl
// }
module.exports = {
  save_complaint
};
