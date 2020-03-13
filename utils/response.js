const { to } = require('await-to-js');
const pe = require('parse-error');
const db = {};
const CONFIG = require('../config/config');
const { database } = require('../utils/db');
var dbUtils = require('../utils/response');

module.exports.to = async promise => {
  let err, res;
  [err, res] = await to(promise);
  if (err) return [pe(err)];
  return [null, res];
};
module.exports.try = async (query, dataArray, single = false) => {
  try {
    var result = await database.query(query, dataArray, single);
    var result = result.length ? JSON.parse(result) : [];
    return [null, result];
  } catch (error) {
    return [error, null];
  }
};
module.exports.getUserReadableError = async function(res, err) {
  try {
    var err_code = err.code;
    var fld = {
      error_code: err.code,
      error_message: err.sqlMessage,
    };
    var insert_error = ([err, data] = await dbUtils.try('INSERT INTO tbl_error SET ?', [fld]));
    var error = ([err, data] = await dbUtils.try(`SELECT * from error_codes where error_code = "${err_code}"`, 1));
    if (err) throw new Error(err.message);
    var error = error[1];
    if (error[0].type == 1) {
      var err = 'Someting went worng!!';
      return err;
    } else {
      return error[0].message;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.ReE = async function(res, err, code = 403) {
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    var error = await this.getUserReadableError(res, err);
  }
  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json({ status: 'error', success: false, error: error });
};

module.exports.ReS = function(res, data, code = 200) {
  let send_data = { status: 'ok', success: true };
  if (typeof data == 'object') {
    send_data = Object.assign(data, send_data); //merge the objects
  }
  if (typeof code !== 'undefined') res.statusCode = code;
  res.json(send_data);
};
module.exports.TE = function(err_message, log) {
  if (log === true) {
    console.error(err_message);
  }
  throw new Error(err_message);
};
module.exports.respond = function(res, response, code = null) {
  var err = response[0];
  if (err) {
    res.statusCode = 403;
    this.ReE(res, err, 403);
  } else {
    var data = this.ReS(res, response[1]);
  }
};
module.exports.rowtojson = function(data) {
  return JSON.parse(JSON.stringify(data));
};
