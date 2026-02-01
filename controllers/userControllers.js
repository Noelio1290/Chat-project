const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try{
    //1.Destructuramos los datos que vienen del Frontend
    const { name, lastName, maternalLastName, email, password } = req.body;

    //2.Verificamos si el usuario ya existe
    const emailCheck = await User.findOne({ email });
    if(emailCheck){
      return res.json({ msg: "Este correo ya esta en uso", status: false });
    }

    //3.Encriptamos la contraseña (hash)
    //El "10" es e costo por procesamiento (salt rounds). Mas alto = mas seguro pero mas lento
    const hashedPassword = await bcrypt.hash(password, 10);

    //4.Creamos el usuario en la Base de Datos
    const user = await User.create({
      name,
      lastName,
      maternalLastName,
      email,
      password: hashedPassword,
    });

    //5.Elimino la contraseña del objeto que se devuelve (por seguridad)
    const userResponse = user.toObject();
    delete userResponse.password;

    //6.Respondemos al cliente
    return res.json({ status: true, user: user.userResponse });

  } catch (ex) {
    //si hay error lo mandamos al sig middleware
    next(ex);
  }
};