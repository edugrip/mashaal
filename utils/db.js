var mysql = require('mysql');
var config = {
  host: process.env.host || 'localhost',
  user: process.env.user || 'root',
  password: process.env.password || 'password',
  database: process.env.database || 'educations',
  insecureAuth: true,
  // debug: ['ComQueryPacket', 'RowDataPacket'],
};

// let config = {} //Make this global to use all over the application

// config.app          = process.env.APP
// config.port         = process.env.PORT

// config.db_dialect   = process.env.DB_DIALECT
// config.db_host      = process.env.DB_HOST
// config.db_port      = process.env.DB_PORT
// config.db_name      = process.env.DB_NAME
// config.db_user      = process.env.DB_USER
// config.db_password  = process.env.DB_PASSWORD

// config.debug = ['ComQueryPacket', 'RowDataPacket']

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args, single) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows, fields) => {
        if (err) return reject(err);
        var result = single ? rows[0] : rows;
        if (rows.length) resolve(JSON.stringify(result));
        resolve(result);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
const database = new Database(config);
module.exports.database = database;
