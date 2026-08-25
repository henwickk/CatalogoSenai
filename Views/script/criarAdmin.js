const bcrypt = require("bcrypt");
const db = require("../config/db");

async function criarAdmin() {
  try {
    const login = "admin";
    const senha = "senai@2026";

    // Cria o hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = `
      INSERT INTO usuarios (login, senha)
      VALUES (?, ?)
    `;

    await db.execute(sql, [login, senhaHash]);

    console.log("Admin criado com sucesso!");

  } catch (erro) {
    console.error("Erro ao criar admin:", erro.message);

  } finally {
    await db.end();
  }
}

criarAdmin();