const CardModel = require("../Models/cardModel");

class CardController {

  // Criar um novo card
  static async criar(req, res) {
    try {
      const dados = req.body;

      const resultado = await CardModel.criar(dados);

      return res.status(201).json({
        mensagem: "Card criado com sucesso!",
        id: resultado.insertId
      });

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao criar o card",
        erro: erro.message
      });
    }
  }


  // Listar todos os cards
  static async listarTodos(req, res) {
    try {
      const cursos = await CardModel.listarTodos();

      return res.status(200).json(cursos);

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao buscar os cards",
        erro: erro.message
      });
    }
  }


  // Buscar card por ID
  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const curso = await CardModel.buscarPorId(id);

      if (!curso) {
        return res.status(404).json({
          mensagem: "Card não encontrado"
        });
      }

      return res.status(200).json(curso);

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao buscar o card",
        erro: erro.message
      });
    }
  }


  // Editar parcialmente um card (PATCH)
  static async editar(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const resultado = await CardModel.editar(id, dados);

      // Nenhum campo válido foi enviado
      if (resultado === null) {
        return res.status(400).json({
          mensagem: "Nenhum campo válido foi enviado para atualização"
        });
      }

      // Card não encontrado
      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensagem: "Card não encontrado"
        });
      }

      return res.status(200).json({
        mensagem: "Card atualizado com sucesso!"
      });

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao atualizar o card",
        erro: erro.message
      });
    }
  }


  // Deletar um card
  static async deletar(req, res) {
    try {
      const { id } = req.params;

      const resultado = await CardModel.deletar(id);

      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensagem: "Card não encontrado"
        });
      }

      return res.status(200).json({
        mensagem: "Card deletado com sucesso!"
      });

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao deletar o card",
        erro: erro.message
      });
    }
  }

}

module.exports = CardController;