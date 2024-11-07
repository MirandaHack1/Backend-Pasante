const cliente = require("../Controlador/cliente.controller.js");
let router = require("express").Router();


router.get("/getclientes/:busqueda", cliente.listaclientes);
router.get("/getclientesdatos/:idcuentas", cliente.clientesdatos);


router.put("/updatecliente", cliente.actualizarCliente);
router.delete("/deletecliente/:id", cliente.delete);
router.put("/updateclientecontrasena",cliente.actualizarContrasena);


module.exports = router;
