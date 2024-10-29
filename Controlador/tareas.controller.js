const db = require('../Modelos/index.js');
const Tareas = db.tareas;
exports.create = async (req, res) => {
    try {
        if (req.body.inNombre == null || req.body.inedad == null || req.body.infecha == null) {
            res.status(400).send({
                message: "Faltan datos"
            });
            return;
        }
        function isValidDate(dateString) {
            // Verificar el formato usando una expresión regular
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateString.match(regex)) return false;
        
            // Descomponer la fecha
            const [year, month, day] = dateString.split('-').map(Number);
        
            // Crear un objeto Date
            const date = new Date(year, month - 1, day); // Mes es 0-indexado en JS
        
            // Verificar si la fecha coincide con la entrada
            return date.getFullYear() === year && 
                   date.getMonth() === month - 1 && 
                   date.getDate() === day;
        }
        
        insValidDate = isValidDate(req.body.infecha);

        let tareas = {
            inNombre: req.body.inNombre,
            inedad: req.body.inedad,
            infecha: req.body.infecha
        };
        const newTarea = await Tareas.create(tareas);

        respuesta = {
            message: "Tarea creada con exito",
            status: 200,
            data: newTarea
        };

        res.send(respuesta);
    }catch (error) {
        res.status(500).send({
            message: error.message || "Error interno del servidor"
        });
    };
};


