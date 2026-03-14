const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
const socket = require("socket.io") 


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

//Se guarda la instancia del servidor en una variable
const server = app.listen(process.env.PORT, () => {
  console.log(`sever corriendo en puerto ${process.env.PORT}`);
});

//configuracion SOCKET.IO
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  },
});

//variable global para guardar usuarios conectadados en memoria RAM
global.onlineUsers = new Map()

io.on("connection", (socket) => {
  //cuando un usuario entra a la app guardamos su id
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  //cuando envian un mensaje
  socket.on("send-msg", (data) => {
    //buscamos el socket del destinatario
    const sendUserSocket = onlineUsers.get(data.to)

    // si esta conectado le mandamos el mensaje al instante
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
})


