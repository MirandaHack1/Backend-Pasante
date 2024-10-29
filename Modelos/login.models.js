
module.exports = (sequelize, Sequelize) => {
    
    let login = sequelize.define('login', {
        loCode :{
            type:  Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        loCorreo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        loContrasena : {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'login'
    });
    return login;
};