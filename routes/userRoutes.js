const router = require("express").Router();
const { register, login, getAllUsers } = require("../controllers/userControllers");

//Defino la ruta POST para registro
router.post("/register", register);
//Defino la ruta POST para login
router.post("/login", login);
//Defino la ruta get para traer todos los usuarios excepto el mio
router.get("/allusers/:id", getAllUsers);


module.exports = router;