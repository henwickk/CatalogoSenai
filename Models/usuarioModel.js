const db = require("../db/db");

class UsuarioModel {

  static async buscarPorLogin(nome_usuario) {
    const sql = `
      SELECT *
      FROM usuario
      WHERE nome_usuario = ?
      LIMIT 1
    `;

    const [usuario] = await db.execute(sql, [nome_usuario]);

    return usuario[0];
  }

}

module.exports = UsuarioModel;