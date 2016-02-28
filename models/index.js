/**
 * Created by reed on 2/27/16.
 */

'use strict'
var fs = require('fs');
var path = require('path');
// Setup sequelize stuff
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = require('../credentials.json');
var db = { "sequelize": "", "Sequelize": "" };

var sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
