const express= require("express");
const { actualizarItem, incluirItem } = require("../controllers/users");
const { authMiddleware } = require("../utils/authMiddleware");
const router = express.Router();



router.put("/register", authMiddleware, actualizarItem);
router.patch("/company", authMiddleware, incluirItem);

module.exports = router;