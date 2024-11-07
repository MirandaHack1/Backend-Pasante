const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// const Trouter = require('./Routest/tarea.routes.js');
const Trouter = require('./Routest/tarea.routes.js');
var loginRouter = require('./Routest/login.routes.js');
let userRouter = require('./Routest/user.routes.js');
let clienteRouter = require('./Routest/cliente.routes.js');







var corsOptions = {
    origin: '*'
}




app.use(cors(corsOptions))
app.use(express.json());


app.use('/api/tareas', Trouter);
app.use('/api/login', loginRouter);

app.use('/api/user', userRouter);
app.use('/api/cliente', clienteRouter);   


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;