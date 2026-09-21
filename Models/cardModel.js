const db = require("../db/db");

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
            local_curso,
            data_inicio_curso,
            fk_usuario
        } = dados;

        const dataPrevInicio_curso = data_inicio_curso;

        const sql = `
            INSERT INTO curso (
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
                local_curso,
                dataPrevInicio_curso,
                fk_usuario
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            local_curso,
            data_inicio_curso,
            fk_usuario
        ];

        const [resultado] = await db.execute(sql, valores);
        

        return resultado;
    }


    // Listar todos os cards
    static async listarTodos() {

        const sql = `
            SELECT 
                c.*,
                u.nome_usuario AS autor
            FROM curso c
            INNER JOIN usuario u
                ON c.fk_usuario = u.id_usuario
        `;

        const [cursos] = await db.execute(sql);

        return cursos;
    }


    // Listar somente os cards de um usuário
    static async listarPorUsuario(id_usuario) {

        const sql = `
            SELECT 
                c.*,
                u.nome_usuario AS autor
            FROM curso c
            INNER JOIN usuario u
                ON c.fk_usuario = u.id_usuario
            WHERE c.fk_usuario = ?
        `;

        const [cursos] = await db.execute(sql, [id_usuario]);

        return cursos;
    }


    // Buscar card por ID
    static async buscarPorId(id) {

        const sql = `
            SELECT 
                c.*,
                u.nome_usuario AS autor
            FROM curso c
            INNER JOIN usuario u
                ON c.fk_usuario = u.id_usuario
            WHERE c.id_curso = ?
        `;

        const [curso] = await db.execute(sql, [id]);

        return curso[0];
    }


    // Editar parcialmente um card
    static async editar(id, dados, id_usuario, tipo_usuario) {

        const camposPermitidos = [
            "nome_curso",
            "turno_curso",
            "descricao_curso",
            "grade_curso",
            "modalidade_curso",
            "status_curso",
            "cargaHoraria_curso",
            "categoria_curso",
            "valor_curso",
            "imagem_curso",
            "local_curso",
            "data_inicio_curso"
        ];

        const campos = [];
        const valores = [];

        for (const [campo, valor] of Object.entries(dados)) {

            if (camposPermitidos.includes(campo)) {

                campos.push(`${campo} = ?`);
                valores.push(valor);

            }
        }

        if (campos.length === 0) {
            return null;
        }

        valores.push(id);

        let sql = `
            UPDATE curso
            SET ${campos.join(", ")}
            WHERE id_curso = ?
        `;

        // Usuário normal só pode editar o próprio curso
        if (tipo_usuario !== "Administrador") {
            sql += ` AND fk_usuario = ?`;
            valores.push(id_usuario);
        }

        const [resultado] = await db.execute(sql, valores);

        return resultado;
    }


    // Deletar um card
    static async deletar(id, id_usuario, tipo_usuario) {

        let sql = `
            DELETE FROM curso
            WHERE id_curso = ?
        `;

        const valores = [id];

        // Usuário normal só pode deletar o próprio curso
        if (tipo_usuario !== "Administrador") {
            sql += ` AND fk_usuario = ?`;
            valores.push(id_usuario);
        }

        const [resultado] = await db.execute(sql, valores);

        return resultado;
    }

}

module.exports = CardModel;