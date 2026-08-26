const db = require("../config/db");

class CardModel {

  // Criar um novo card
  static async criar(dados) {
    const {
      nome_curso,
      turno_curso,
      descricao_curso,
      grade_curso,
      modalidade_curso,
      status_curso,
      cargaHoraria_curso,
      categoria_curso,
      valor_curso,
      imagem_curso,
      local_curso
    } = dados;

    const sql = `
      INSERT INTO cursos (
        nome_curso,
        turno_curso,
        descricao_curso,
        grade_curso,
        modalidade_curso,
        status_curso,
        cargaHoraria_curso,
        categoria_curso,
        valor_curso,
        imagem_curso,
        local_curso
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      nome_curso,
      turno_curso,
      descricao_curso,
      grade_curso,
      modalidade_curso,
      status_curso,
      cargaHoraria_curso,
      categoria_curso,
      valor_curso,
      imagem_curso,
      local_curso
    ];

    const [resultado] = await db.execute(sql, valores);

    return resultado;
  }


  // Listar todos os cards
  static async listarTodos() {
    const sql = `SELECT * FROM curso`;

    const [curso] = await db.execute(sql);

    return curso;
  }


  // Buscar card por ID
  static async buscarPorId(id) {
    const sql = `
      SELECT * FROM curso
      WHERE id = ?
    `;

    const [curso] = await db.execute(sql, [id]);

    return curso[0];
  }


  // Editar parcialmente um card (PATCH)
  static async editar(id, dados) {

    const camposPermitidos = [
      nome_curso,
      turno_curso,
      descricao_curso,
      grade_curso,
      modalidade_curso,
      status_curso,
      cargaHoraria_curso,
      categoria_curso,
      valor_curso,
      imagem_curso,
      local_curso
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
      UPDATE curso
      SET ${campos.join(", ")}
      WHERE id = ?
    `;

    const [resultado] = await db.execute(sql, valores);

    return resultado;
  }


  // Deletar um card
  static async deletar(id) {
    const sql = `
      DELETE FROM curso
      WHERE id = ?
    `;

    const [resultado] = await db.execute(sql, [id]);

    return resultado;
  }
}

module.exports = CardModel;