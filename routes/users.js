const express= require("express");
const createItem = require("../controllers/users");
const { validationResult } = require("../validator/users");
const router = express.Router();


router.post("/", validationResult,createItem);



module.exports = router;


