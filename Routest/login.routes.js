const authJwt = require("../middlewares/authJwt");
const login = require ("../Controlador/login.controller.js");

let router = require ("express").Router();

//ingresar sistemas
router.post("/", login.login);


module.exports = router;
