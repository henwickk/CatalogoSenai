const bcrypt = require("bcrypt");

const UsuarioModel = require("../Models/usuarioModel");

class UsuarioController {

    static async login(req, res) {

        try {

            const { nome_usuario, senha_usuario } = req.body;

            // Verifica se os campos foram preenchidos
            if (!nome_usuario || !senha_usuario) {
                return res.status(400).json({
                    mensagem: "Nome e senha são obrigatórios"
                });
            }

            // Busca o usuário pelo nome
            const usuario = await UsuarioModel.buscarPorNome(nome_usuario);

            // Usuário não encontrado
            if (!usuario) {
                return res.status(401).json({
                    mensagem: "Nome ou senha incorretos"
                });
            }

            // Verifica se a conta está ativa
            if (usuario.status_usuario !== "ativo") {
                return res.status(403).json({
                    mensagem: "Esta conta está inativa"
                });
            }

            // Compara a senha digitada com a senha criptografada do banco
            const senhaCorreta = await bcrypt.compare(
                senha_usuario,
                usuario.senha_usuario
            );

            // Senha incorreta
            if (!senhaCorreta) {
                return res.status(401).json({
                    mensagem: "Nome ou senha incorretos"
                });
            }

            // Salva os dados do usuário na sessão
            req.session.usuario = {
                id_usuario: usuario.id_usuario,
                nome_usuario: usuario.nome_usuario,
                tipo_usuario: usuario.tipo_usuario
            };

            // Login realizado
            return res.status(200).json({
                mensagem: "Login realizado com sucesso",
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nome_usuario: usuario.nome_usuario,
                    tipo_usuario: usuario.tipo_usuario
                }
            });

        } catch (erro) {

            console.error("Erro no login:", erro);

            return res.status(500).json({
                mensagem: "Erro ao realizar login"
            });
        }
    }
}

module.exports = UsuarioController;