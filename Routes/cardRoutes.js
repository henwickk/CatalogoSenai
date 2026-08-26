const express = require("express");
const router = express.Router();

const CardController = require("../Controller/cardController");


// Criar um card
router.post("/", CardController.criar);

// Listar todos os cards
router.get("/", CardController.listarTodos);

// Buscar um card pelo ID
router.get("/:id", CardController.buscarPorId);

// Editar parcialmente um card
router.patch("/:id", CardController.editar);

// Deletar um card
router.delete("/:id", CardController.deletar);

module.exports = router;