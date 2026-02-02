const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");


const app = express();
require("dotenv").config();

//Middlewares
app.use(cors());
app.use(express.json()); //Nos permite recibir datos en formato json

// --- ZONA DE RUTAS ---
app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

//Conexion a MongooDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
  console.log("DB Conectada exitosamente con MongoDB Atlas")
})
.catch((err) => {
  console.log("Error en conexion a Mongo DB", err.message)
})

//Ruta de prueba
app.get("/", (req, res) => {
  res.send("mi servidor esta funcionando!!!")
});

//Configuracion de puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`)
});

