const express= require("express");
const {createItem,validateItem} = require("../controllers/users");
const { validationResult } = require("../validator/users");
const router = express.Router();


router.post("/registro", validationResult,createItem);
router.post("/validacion", validateItem);


module.exports = router;


