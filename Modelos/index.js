var Sequelize = require('sequelize');

var dbconfig = require('../config.js');

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};
// SEQUELIZE ES UNA LIBRERIA QUE ME PERMITE HACER CONEXIONES A BASE DE DATOS
db.Sequelize = Sequelize;
// SEQUELIZE ES UNA LIBRERIA QUE ME PERMITE HACER CONEXIONES A BASE DE DATOS
db.sequelize = sequelize;
//LLAMA A  MODELO QUE ES MI STRUCTURA DE MI TABLA
db.tareas = require('./tareas.models.js')(sequelize, Sequelize);
//LLAMA A  MODELO DE MI LOGIN
db.login = require('./login.models.js')(sequelize, Sequelize);
//ME DEVUELVE EL OBJETO DB
module.exports = db;