/**
 * Automatically migrates base modles
 */

// base loopback models
const MODELS = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
module.exports = function updateBaseModels (app, next) {
  // reference to our datasource
  const mysql = app.dataSources.mysql;
  // check if the model is out of sync with DB
  mysql.isActual(MODELS, (err, actual) => {
    if (err) {
      throw err;
    }
    const syncStatus = actual ? 'in sync' : 'out of sync';
    console.log('');
    console.log(`Base models are ${syncStatus}`);
    console.log('');
    // skip if models in sync
    if (actual) {
      return next();
    }

    console.log('Migrating Base Models...');
    // update models
    mysql.autoupdate(MODELS, (_err) => {
      if (_err) {
        throw _err;
      }
      console.log('Base models migration successful!');
      console.log('');
      next();
    });
  });
};
