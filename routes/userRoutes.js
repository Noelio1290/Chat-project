const router = require("express").Router();
const { register } = require("../controllers/userControllers");

//Defino la ruta POST para registro
router.post("/register", register);

module.exports = router;