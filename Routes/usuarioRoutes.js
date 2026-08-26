const express = require("express");
const router = express.Router();

const UsuarioController = require("../Controller/usuarioController");

// Login do administrador
router.post("/login", UsuarioController.login);

module.exports = router;