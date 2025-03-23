const express= require("express");
const {createItem,validateItem, loginItem} = require("../controllers/users");
const { validationResult } = require("../validator/users");
const { authMiddleware } = require("../utils/authMiddleware");
const { loginValidator } = require("../validator/loginValidator");
const router = express.Router();


router.post("/registro", validationResult,createItem);
router.post("/validacion",authMiddleware ,validateItem);
router.post("/login",loginValidator,loginItem);


//Datos personales
//router.post("/", usuarioValidator ,usuarioCreacion);
//Datos de la compañia
//router.post("/companya", companyaValidator, compayiaCreacion);


module.exports = router;


