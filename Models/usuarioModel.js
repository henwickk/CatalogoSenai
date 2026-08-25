const db = require("../config/db");

class UsuarioModel {

  static async buscarPorLogin(login) {
    const sql = `
      SELECT *
      FROM usuarios
      WHERE login = ?
      LIMIT 1
    `;

    const [usuarios] = await db.execute(sql, [login]);

    return usuarios[0];
  }

}

module.exports = UsuarioModel;