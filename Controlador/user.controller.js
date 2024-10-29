const db = require('../Modelos/index.js');
const User = db.login;
const bcrypt = require("bcryptjs");

exports.newUser = async (req, res) => {
    try {
        // Validación de datos nulos
        if (!req.body.loCorreo || !req.body.loContrasena || !req.body.loNombre || !req.body.loApellido) {
            return res.status(400).send({
                message: "Faltan datos"
            });
        }

        // Generar salt y encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEnciptada = await bcrypt.hash(req.body.loContrasena, salt);

        let login = {
            loCorreo: req.body.loCorreo,
            loContrasena: contrasenaEnciptada,
            loNombre: req.body.loNombre,
            loApellido: req.body.loApellido,
        };

        const newUser = await User.create(login);

        res.status(200).send({
            message: "Usuario creado con éxito",
            status: 200,
            data: newUser
        });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
