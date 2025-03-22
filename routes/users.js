const express= require("express");
const {createItem,validateItem} = require("../controllers/users");
const { validationResult } = require("../validator/users");
const { authMiddleware } = require("../utils/authMiddleware");
const router = express.Router();


router.post("/registro", validationResult,createItem);
router.post("/validacion",authMiddleware ,validateItem);


module.exports = router;


