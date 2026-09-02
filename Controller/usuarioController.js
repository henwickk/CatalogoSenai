const bcrypt = require("bcrypt");
const UsuarioModel = require("../Models/usuarioModel");

class UsuarioController {

  static async login(req, res) {
    try {
      const { nome_usuario, senha_usuario} = req.body;

      // Verifica se os campos foram preenchidos
      if (!nome_usuario || !senha_usuario) {
        return res.status(400).json({
          mensagem: "Login e senha são obrigatórios"
        });
      }

      // Busca o usuário pelo login
      const usuario = await UsuarioModel.buscarPorLogin(login);

      // Usuário não encontrado
      if (!usuario) {
        return res.status(401).json({
          mensagem: "Login ou senha incorretos"
        });
      }

      // Compara a senha digitada com o hash do banco
      const senhaCorreta = await bcrypt.compare(
        senha_usuario,
        usuario.senha_usuario
      );

      // Senha incorreta
      if (!senhaCorreta) {
        return res.status(401).json({
          mensagem: "Login ou senha incorretos"
        });
      }

      // Login realizado
      return res.status(200).json({
        mensagem: "Login realizado com sucesso",
        usuario: {
          id: usuario.id,
          login: usuario.login
        }
      });

    } catch (erro) {
      return res.status(500).json({
        mensagem: "Erro ao realizar login",
        erro: erro.message
      });
    }
  }

}

module.exports = UsuarioController;