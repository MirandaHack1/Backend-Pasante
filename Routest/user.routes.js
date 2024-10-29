//CREACION DE VISTAS
const tarea = require("../Controlador/user.controller.js");
var router = require("express").Router();


router.post("/", user.create);

module.exports = router;