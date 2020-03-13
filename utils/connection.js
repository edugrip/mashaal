var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  //   hosts: [
  //   //  'https://[username]:[password]@[server]:[port]/',
  //   //  'https://[username]:[password]@[server]:[port]/'
  //   'https://elastic:changeme@localhost:9200'
  //   ]
  host: 'localhost:9200',
  log: 'info',
});
module.exports.client = client;
