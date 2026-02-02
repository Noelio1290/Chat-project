const Messages = require("../models/messageModel");

// 1. Guardar mensaje en la BD
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Mensaje añadido exitosamente." });
    else return res.json({ msg: "Error al añadir mensaje en la base de datos" });
  } catch (ex) {
    next(ex);
  }
};

// 2. Obtener historial del chat
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    // Buscamos mensajes donde estén involucrados ESTOS DOS usuarios
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 }); // Ordenamos del más viejo al más nuevo

    // Formateamos para el frontend:
    // fromSelf: true (si lo envié yo, va a la derecha)
    // fromSelf: false (si lo recibí, va a la izquierda)
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
}