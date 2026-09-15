const db = require("../db/db");

class UsuarioModel {

    static async buscarPorNome(nome_usuario) {
        const sql = `
            SELECT *
            FROM usuario
            WHERE nome_usuario = ?
            LIMIT 1
        `;

        const [usuario] = await db.execute(sql, [nome_usuario]);

        return usuario[0];
    }


    static async listarTodos() {
        const sql = `
            SELECT
                u.id_usuario,
                u.nome_usuario,
                u.tipo_usuario,
                u.status_usuario,
                COUNT(c.id_curso) AS cursos_cadastrados
            FROM usuario u
            LEFT JOIN curso c
                ON c.fk_usuario = u.id_usuario
            GROUP BY
                u.id_usuario,
                u.nome_usuario,
                u.tipo_usuario,
                u.status_usuario
            ORDER BY u.id_usuario;
        `;

        const [usuarios] = await db.execute(sql);

        return usuarios;
    }


    static async criar(nome_usuario, senha_usuario) {

        const sql = `
            INSERT INTO usuario (
                nome_usuario,
                senha_usuario,
                tipo_usuario,
                status_usuario
            )
            VALUES (?, ?, ?, ?)
        `;

        const [resultado] = await db.execute(sql, [
            nome_usuario,
            senha_usuario,
            "Usuario",
            "ativo"
        ]);

        return resultado;
    }

    static async atualizarSenha(id_usuario, senhaHash) {

        const sql = `
        UPDATE usuario
        SET senha_usuario = ?
        WHERE id_usuario = ?
    `;

        const [resultado] = await db.execute(sql, [
            senhaHash,
            id_usuario
        ]);

        return resultado;
    }


    static async alterarStatus(id_usuario, status_usuario) {
        const sql = `
        UPDATE usuario
        SET status_usuario = ?
        WHERE id_usuario = ?
    `;

        const [resultado] = await db.execute(sql, [
            status_usuario,
            id_usuario
        ]);

        return resultado;
    }

}

module.exports = UsuarioModel;