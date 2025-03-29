const express = require("express");
const router = express.Router();
const { subirLogo } = require("../controllers/users");
//const uploadMiddleware = require("../utils/multerConfig");
const { authMiddleware } = require("../utils/authMiddleware");


//router.patch("/logo", authMiddleware, uploadMiddleware.single("logo"), subirLogo);


module.exports = router;