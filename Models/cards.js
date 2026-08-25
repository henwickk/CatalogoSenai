const db = require("../config/db");

class CardModel {

  // Criar um novo card
  static async criar(dados) {
    const {
      nome,
      imagem,
      categoria,
      carga_horaria,
      descricao,
      turno,
      grade_curso,
      status,
      valor,
      modalidade
    } = dados;

    const sql = `
      INSERT INTO cursos (
        nome,
        imagem,
        categoria,
        carga_horaria,
        descricao,
        turno,
        grade_curso,
        status,
        valor,
        modalidade
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      nome,
      imagem,
      categoria,
      carga_horaria,
      descricao,
      turno,
      grade_curso,
      status,
      valor,
      modalidade
    ];

    const [resultado] = await db.execute(sql, valores);

    return resultado;
  }


  // Listar todos os cards
  static async listarTodos() {
    const sql = `SELECT * FROM cursos`;

    const [cursos] = await db.execute(sql);

    return cursos;
  }


  // Buscar card por ID
  static async buscarPorId(id) {
    const sql = `
      SELECT * FROM cursos
      WHERE id = ?
    `;

    const [curso] = await db.execute(sql, [id]);

    return curso[0];
  }


  // Editar parcialmente um card (PATCH)
  static async editar(id, dados) {

    const camposPermitidos = [
      "nome",
      "imagem",
      "categoria",
      "carga_horaria",
      "descricao",
      "turno",
      "grade_curso",
      "status",
      "valor",
      "modalidade"
    ];

    const campos = [];
    const valores = [];

    for (const [campo, valor] of Object.entries(dados)) {

      if (camposPermitidos.includes(campo)) {
        campos.push(`${campo} = ?`);
        valores.push(valor);
      }

    }

    // Evita executar um PATCH sem campos válidos
    if (campos.length === 0) {
      return null;
    }

    valores.push(id);

    const sql = `
      UPDATE cursos
      SET ${campos.join(", ")}
      WHERE id = ?
    `;

    const [resultado] = await db.execute(sql, valores);

    return resultado;
  }


  // Deletar um card
  static async deletar(id) {
    const sql = `
      DELETE FROM cursos
      WHERE id = ?
    `;

    const [resultado] = await db.execute(sql, [id]);

    return resultado;
  }
}

module.exports = CardModel;