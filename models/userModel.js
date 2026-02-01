const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String, //tipo de dato
      required: true, //es obligatorio
      minLength: 2  //min de caracteres 
    },
    lastName:{
      type: String,
      required: true,
    },
    maternalLastName:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true, //unico en la base de datos
      maxLength: 50 //max de caracteres
    },
    password:{
      type: String,
      required: true,
      minLength: 8 //min de seguridad
    },
    avatarImage:{
      type: String,
      default: "",
    },
  },
  {
    timestamps: true //crea 'createdAt' y 'updatedAt'
  }
);

module.exports = mongoose.model("Users", userSchema)