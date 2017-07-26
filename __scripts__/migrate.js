const path = require('path');

// import app
const server = require(path.resolve(__dirname, '../server/server.js'));
// ref to our datasource
const mysql = server.dataSources.mysql;
// loopback model tables
const BASE = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
// defined custom models -> ADD custom
const CUSTOM = [];
const lbTables = [].concat(BASE, CUSTOM);
// cylce to create
mysql.automigrate(lbTables, function (err) {
  if (err) { throw err; }
  console.log(' ');
  console.log('Tables [' + lbTables + '] reset in ' + mysql.adapter.name);
  console.log(' ');
  mysql.disconnect();
  process.exit(0);
});
