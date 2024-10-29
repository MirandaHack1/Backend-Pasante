const sysConfig = require('../config/system.config.js');
const jwt = require("jsonwebtoken");
const db = require('../Modelos/index.js');
const login = db.login;
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    if (!req.body.loCorreo || !req.body.loContrasena) {
        return res.status(400).send({ message: "Faltan datos" });
    }

    try {
        const user = await login.findOne({ where: { loCorreo: req.body.loCorreo } });
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        // Verifica la contraseña   
        let isPasswordValid = await bcrypt.compare(req.body.loContrasena, user.loContrasena);
        console.log("Contraseña ingresada:", req.body.loContrasena);
        console.log("Contraseña encriptada almacenada:", user.loContrasena);
        console.log("¿Contraseña válida?", isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.loCode, usuario: user.loCorreo }, sysConfig.PASSWORD, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            message: "Usuario encontrado",
            status: 200,
            data: user,
            token: token
        });
    } catch (err) {
        console.error("Error en el login:", err); // Agregar logging del error
        res.status(500).send({ message: err.message });
    }
};
