const express= require("express");
const createItem = require("../controllers/users");
const {  } = require("");
const router = express.Router();


router.post("/", validationResult,createItem);



module.exports = router;


