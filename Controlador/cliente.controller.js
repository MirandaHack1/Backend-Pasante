const sysConfig = require('../config/system.config.js');
const jwt = require("jsonwebtoken");
const db = require('../Modelos/index.js');
const login = db.login;
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');


// traigo todos los datos de mi base de datos y segun el parametro de busqueda
exports.listaclientes = async (req, res) => {
  let busqueda = req.params.busqueda;  
  console.log("El dato de búsqueda es:", busqueda);

  try {
      let condition = {};

      if (busqueda === '*') {
          const data = await login.findAll({ limit: 100 });
          return res.send(data);
      } else {
          condition = {[Op.or]: [{ loCorreo: { [Op.like]: `%${busqueda}%` } },{ loNombre: { [Op.like]: `%${busqueda}%` } },{ loApellido: { [Op.like]: `%${busqueda}%` } }]};
      }
      const data = await login.findAll({ where: condition, limit: 100 });
      res.send(data);
      
  } catch (err) {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving customers."
      });
  }
};


//filtro la informacion de la persona por el id 
exports.clientesdatos = async (req, res) => {
  let idcuentas = req.params.idcuentas;
  idcuentas = Number(idcuentas); 
  if (isNaN(idcuentas)) {
    return res.status(400).send({ message: "El idcuentas no es válido" });
  }
  let condition = idcuentas ? { loCode: { [Op.eq]: idcuentas } }  : {};

  login.findAll({ where: condition, limit: 100 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    });
};


//Actualizo los datos del cliente segun el id seleccionado
exports.actualizarCliente = async (req, res) => {
  console.log(req.body);
  let data = req.body;
  let respuesta;

  let clienteUpdate = {
      loNombre: data.loNombre,
      loApellido: data.loApellido,
      loCorreo: data.loCorreo,  
  }

  await login.update(clienteUpdate, { where: { loCode: data.loCode } })

  respuesta = {
      status: "ok",
      code: 200,
      message: "Actualizado con éxito!!",
  }

  res.send(respuesta);

}



//Actualizo solo la contraseña del cliente segun el id seleccionado
exports.actualizarContrasena = async (req, res) => {
  console.log(req.body);
  let data = req.body;
  let respuesta;
 // Generar salt y encriptar la contraseña
 const salt = await bcrypt.genSalt(10);
 const contrasenaEnciptada = await bcrypt.hash(data.loContrasena, salt);

  let clienteUpdate = {
      loContrasena: contrasenaEnciptada,  
  }

  await login.update(clienteUpdate, { where: { loCode: data.loCode } })

  respuesta = {
      status: "ok",
      code: 200,
      message: "Actualizado con éxito!!",
  }

  res.send(respuesta);

}



//borro el cliente por el id  
exports.delete = async (req, res) => {
  let respuesta;
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error("ID no válido");
    }

    let query = 'DELETE FROM login WHERE loCode = :id';
    const result = await db.sequelize.query(query, {
      replacements: { id },
      type: db.Sequelize.QueryTypes.DELETE
    });

    if (result[0] === 0) {
      throw new Error("No se encontró un cliente con ese ID");
    }

    respuesta = {
      code: 200,
      message: "La cliente se ha borrado correctamente.",
      status: "ok"
    };
  } catch (e) {
    respuesta = {
      code: 400,
      message: e.message || "Ocurrió un error al borrar el cliente.",
      status: "error"
    };
  }
  res.send(respuesta);
};



