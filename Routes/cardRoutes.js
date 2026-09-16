const express = require("express");

const router = express.Router();

const CardController = require("../Controller/cardController");

const upload = require("../upload");

// =========================
// CRIAR CARD
// =========================

router.post(
    "/",
    upload.fields([
        { name: "imagem_curso", maxCount: 1 },
        { name: "grade_curso", maxCount: 1 }
    ]),
    CardController.criar
);


// =========================
// LISTAR TODOS OS CARDS
// PÚBLICO — INDEX
// =========================

router.get(
    "/",
    CardController.listarTodos
);


// =========================
// LISTAR CARDS PARA GERENCIAMENTO
// PRIVADO — USUÁRIO / ADMIN
// =========================

router.get(
    "/gerenciamento",
    CardController.listarGerenciamento
);


// =========================
// BUSCAR CARD POR ID
// =========================

router.get(
    "/:id",
    CardController.buscarPorId
);


// =========================
// EDITAR CARD
// =========================

router.patch(
    "/:id",
    upload.fields([
        { name: "imagem_curso", maxCount: 1 },
        { name: "grade_curso", maxCount: 1 }
    ]),
    CardController.editar
);


// =========================
// DELETAR CARD
// =========================

router.delete(
    "/:id",
    CardController.deletar
);


module.exports = router;