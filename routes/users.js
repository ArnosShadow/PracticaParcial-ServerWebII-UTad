const express= require("express");
const createItem = require("../controllers/users");
const router = express.Router();


router.post("/", createItem);



module.exports = router;


