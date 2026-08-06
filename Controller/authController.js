const CursoModel = require("../models/CursoModel");

class CursoController {

    listar(req, res) {
        const cursos = CursoModel.listar();

        res.json(cursos);
    }

    criar(req, res) {

        const dados = req.body;

        CursoModel.criar(dados);

        res.json({
            mensagem: "Curso cadastrado!"
        });

    }

}

module.exports = new CursoController();