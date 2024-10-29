const sysConfig = require('../config/system.config.js');
const jwt = require("jsonwebtoken");
// const db = require ("../Modelos");
const db = require('../Modelos/index.js');
const login = db.login;
const bcypt = require('bcryptjs');

// login 
exports.login = async (req, res) => {

    login.findOne({
        where: {
            loCorreo: req.body.loCorreo,
            loContrasena: req.body.loContrasena
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
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
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

};

// // Validar que el token sea correcto y devuelve la información del usuario almacenada en el token.
// exports.validar = async (req, res) => {

//     let respuestasRapidas = null
//     let cantidadTicketSinCalificar = 0

//     if (req.usuario.rol == 'AGE') {

//         let agente = await Agente.findOne({ where: { SECLAV_CODI: req.usuario.id } })
//         var condition = { PEAREA_IDEN: agente.PEAREA_IDEN };
//         respuestasRapidas = await Respuesta.findAll({ where: condition });

//     } else {
//         let empresa = await Empresa.findOne({ where: { PEEMPR_IDEN: 1 } });
//         cantidadTicketSinCalificar = empresa.PEEMPR_CTSC
//     }

//     var respuesta = {
//         code: 200,
//         data: req.usuario,
//         message: "Validación correcta",
//         status: "ok",
//         respuestas: respuestasRapidas,
//         cantidadSinCalificar: cantidadTicketSinCalificar
//     };

//     res.send(respuesta)

// };