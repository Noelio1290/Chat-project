const router = require("express").Router();
const { register, login } = require("../controllers/userControllers");

//Defino la ruta POST para registro
router.post("/register", register);
//Defino la ruta POST para login
router.post("/login", login);

module.exports = router;