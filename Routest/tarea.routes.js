const tarea = require("../Controlador/tareas.controller.js");
var router = require("express").Router();

router.post("/", tarea.create);

module.exports = router;
