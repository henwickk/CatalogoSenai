const bcrypt = require("bcrypt");
const db = require("../config/db");

async function criarAdmin() {
  try {
    const nome_usuario = "admin";
    const senha_usuario = "senai@2026";

    // Cria o hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = `
      INSERT INTO usuarios (nome_usuario, senha_usuario)
      VALUES (?, ?)
    `;

    await db.execute(sql, [nome_usuario, senha_usuarioHash]);

    console.log("Admin criado com sucesso!");

  } catch (erro) {
    console.error("Erro ao criar admin:", erro.message);

  } finally {
    await db.end();
  }
}

criarAdmin();