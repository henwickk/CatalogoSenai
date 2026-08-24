const db = require('../db/db');

const cards = {
  create: (data, callback) => {
    if (!data.titulo || !data.autor) {
      return callback(new Error('Título e Autor são obrigatórios'));
    }

    const query = 'INSERT INTO products (titulo, autor) VALUES (?, ?)';
    db.execute(query, [data.titulo, data.autor], (err, result) => {
      if (err) {
        console.error('Erro ao criar card:', err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM products';
    db.execute(query, [], (err, results) => {
      if (err) {
        console.error('Erro ao buscar cards:', err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    if (!id) {
      return callback(new Error('ID é obrigatório'));
    }

    const query = 'SELECT * FROM products WHERE id = ?';
    db.execute(query, [id], (err, result) => {
      if (err) {
        console.error('Erro ao buscar card:', err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (id, data, callback) => {
    if (!id) {
      return callback(new Error('ID é obrigatório'));
    }
    if (!data.titulo || !data.autor) {
      return callback(new Error('Título e Autor são obrigatórios'));
    }

    const query = 'UPDATE products SET titulo = ?, autor = ? WHERE id = ?';
    db.execute(query, [data.titulo, data.autor, id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar card:', err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete: (id, callback) => {
    if (!id) {
      return callback(new Error('ID é obrigatório'));
    }

    const query = 'DELETE FROM products WHERE id = ?';
    db.execute(query, [id], (err, result) => {
      if (err) {
        console.error('Erro ao deletar card:', err);
        return callback(err);
      }
      callback(null, result);
    });
  },
};

module.exports = cards;