const cards = require('../Models/cards');

class CardsController {
  getAll(req, res) {
    cards.getAll((err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar cards' });
      }
      res.json({ success: true, data: results });
    });
  }

  getById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID é obrigatório' });
    }

    cards.getById(id, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar card' });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Card não encontrado' });
      }
      res.json({ success: true, data: result[0] });
    });
  }

  create(req, res) {
    const { titulo, autor } = req.body || {};

    if (!titulo || !autor) {
      return res.status(400).json({ error: 'Título e Autor são obrigatórios' });
    }

    cards.create({ titulo, autor }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar card' });
      }
      res.status(201).json({ success: true, message: 'Card criado', data: result });
    });
  }

  update(req, res) {
    const { id } = req.params;
    const { titulo, autor } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: 'ID é obrigatório' });
    }
    if (!titulo || !autor) {
      return res.status(400).json({ error: 'Título e Autor são obrigatórios' });
    }

    cards.update(id, { titulo, autor }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar card' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Card não encontrado' });
      }
      res.json({ success: true, message: 'Card atualizado', data: result });
    });
  }

  delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID é obrigatório' });
    }

    cards.delete(id, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao deletar card' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Card não encontrado' });
      }
      res.json({ success: true, message: 'Card deletado', data: result });
    });
  }
}

module.exports = new CardsController();
