const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json()); //Nos permite recibir datos en formato json

//Ruta de prueba
app.get("/", (req, res) => {
  res.send("mi servidor esta funcionando!!!")
});

//Configuracion de puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
})

