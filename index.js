require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config')

//Crear el servido express
const app = express();
//CORS
app.use(cors());

//Carpeta Public

app.use( express.static('public'));
// Lectura y parseo del body
app.use( express.json());

//Base de datos
dbConnection();



//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));

app.use('/api/upload', require('./routes/upload'));

app.use('/api/all', require('./routes/busquedas'));
app.use('/api/collection', require('./routes/busquedas'));


app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto: "+process.env.PORT)
})

