/**
 * Automatically migrates custom modles
 */

//custom models
const MODELS = [];
module.exports = function updateCutstomModels (app, next) {
  // reference to our datasource
  const mysql = app.dataSources.mysql;
  // check if the model is out of sync with DB
  mysql.isActual(MODELS, (err, actual) => {
    if (err) {
      throw err;
    }
    const syncStatus = actual ? 'in sync' : 'out of sync';
    console.log('');
    console.log(`Custom models are ${syncStatus}`);
    console.log('');
    // skip if models in sync
    if (actual) {
      return next();
    }

    console.log('Migrating Custom Models...');
    // update models
    mysql.autoupdate(MODELS, (_err) => {
      if (_err) {
        throw _err;
      }
      console.log('Custom models migration successful!');
      console.log('');
      next();
    });
  });
};
