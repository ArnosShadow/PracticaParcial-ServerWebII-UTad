const express= require("express");
const { actualizarItem, incluirItem, obtenerDatos, obtenerDato, eliminarDato, recuperarCuenta } = require("../controllers/users");
const { authMiddleware } = require("../utils/authMiddleware");
const router = express.Router();



router.put("/register", authMiddleware, actualizarItem);
router.patch("/company", authMiddleware, incluirItem);
router.get("/", authMiddleware, obtenerDatos);
router.get("/:email", authMiddleware, obtenerDato);
router.delete("/:email", authMiddleware, eliminarDato);
router.put("/recoverAccount/:email", authMiddleware, recuperarCuenta);


module.exports = router;