const { create } = require("../Controlador/tareas.controller");

module.exports = (sequelize, Sequelize) => {
    
    let tareas = sequelize.define('inicio', {
        inCode :{
            type:  Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        inNombre: {
            type: Sequelize.STRING,
            allowNull: true
        },
        inedad : {
            type: Sequelize.STRING,
            allowNull: true
        },
        infecha: {
            type: Sequelize.DATE,
            allowNull: true
        },
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'inicio'
    });
    return tareas;
};