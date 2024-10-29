const {create} = require("../Controlador/user.controller");

module.exports = (sequelize, Sequelize) => {
    let user = sequelize.define('user', {
        usCode : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usNombre: {
            type: Sequelize.STRING,
            allowNull: true
        },
        usApellido: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'user'
    });
    return user;
}

