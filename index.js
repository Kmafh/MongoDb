require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config')
//Crear el servido express
const app = express();
//Base de datos
dbConnection();

//CORS
app.use(cors());

//Rutas

app.get('/',(req,res) =>{
    res.json({
        ok:true
    })
})
app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto: "+process.env.PORT)
})

