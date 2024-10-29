const authJwt = require("../middlewares/authJwt");
const user = require ("../Controlador/user.controller.js");
let router = require ("express").Router();

//crear usuario
router.post("/", user.newUser);

module.exports = router;