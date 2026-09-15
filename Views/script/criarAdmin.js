const bcrypt = require("bcrypt");
const db = require("../../db/db");

async function criarAdmin() {
    try {

        const nome_usuario = "Administrador";
        const senha_usuario = "senai@2026";
        const tipo_usuario = "Administrador";
        const status_usuario = "ativo";

        const senhaHash = await bcrypt.hash(senha_usuario, 10);

        const sql = `
            INSERT INTO usuario 
            (nome_usuario, senha_usuario, tipo_usuario, status_usuario)
            VALUES (?, ?, ?, ?)
        `;

        await db.execute(sql, [
            nome_usuario,
            senhaHash,
            tipo_usuario,
            status_usuario
        ]);

        console.log("Admin criado com sucesso!");

    } catch (erro) {

        console.error("Erro ao criar admin:", erro.message);

    } finally {
        await db.end();
    }
}

criarAdmin();