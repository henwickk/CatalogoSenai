const express = require("express");
const router = express.Router();

const UsuarioController = require("../Controller/usuarioController");

router.post("/login", UsuarioController.login);

router.get("/usuario/me", UsuarioController.usuarioLogado);

router.get("/usuarios", UsuarioController.listarUsuarios);

router.post("/usuarios", UsuarioController.criarUsuario);

router.put("/usuarios/alterar-senha", UsuarioController.alterarSenha);

router.patch("/usuarios/:id/status",UsuarioController.alterarStatus);

router.post("/logout", UsuarioController.logout);

module.exports = router;