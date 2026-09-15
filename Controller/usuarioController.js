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
    static async usuarioLogado(req, res) {

        if (!req.session.usuario) {
            return res.status(401).json({
                mensagem: "Usuário não está logado"
            });
        }

        return res.status(200).json({
            usuario: req.session.usuario
        });
    }

    static async listarUsuarios(req, res) {
        try {

            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            if (req.session.usuario.tipo_usuario !== "Administrador") {
                return res.status(403).json({
                    mensagem: "Acesso permitido apenas para administradores"
                });
            }

            const usuarios = await UsuarioModel.listarTodos();

            return res.status(200).json(usuarios);

        } catch (erro) {

            console.error("ERRO AO LISTAR USUÁRIOS:", erro);

            return res.status(500).json({
                mensagem: "Erro ao buscar usuários"
            });
        }
    }

    static async criarUsuario(req, res) {
        try {

            // Verifica se está logado
            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            // Somente administrador pode criar contas
            if (req.session.usuario.tipo_usuario !== "Administrador") {
                return res.status(403).json({
                    mensagem: "Acesso permitido apenas para administradores"
                });
            }

            const { nome_usuario, senha_usuario } = req.body;

            // Verifica os campos
            if (!nome_usuario || !senha_usuario) {
                return res.status(400).json({
                    mensagem: "Nome e senha são obrigatórios"
                });
            }

            // Verifica se o usuário já existe
            const usuarioExistente =
                await UsuarioModel.buscarPorNome(nome_usuario);

            if (usuarioExistente) {
                return res.status(409).json({
                    mensagem: "Este nome de usuário já está cadastrado"
                });
            }

            // Criptografa a senha
            const senhaHash = await bcrypt.hash(senha_usuario, 10);

            // Cria o usuário
            const resultado = await UsuarioModel.criar(
                nome_usuario,
                senhaHash
            );

            return res.status(201).json({
                mensagem: "Usuário criado com sucesso!",
                id_usuario: resultado.insertId
            });

        } catch (erro) {

            console.error("ERRO AO CRIAR USUÁRIO:", erro);

            return res.status(500).json({
                mensagem: "Erro ao criar usuário"
            });
        }
    }


    static async alterarSenha(req, res) {

        try {

            // Verifica se está logado
            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            const {
                senhaAtual,
                novaSenha
            } = req.body;

            // Verifica os campos
            if (!senhaAtual || !novaSenha) {
                return res.status(400).json({
                    mensagem: "Preencha todos os campos"
                });
            }

            // Busca o usuário da sessão
            const usuario = await UsuarioModel.buscarPorNome(
                req.session.usuario.nome_usuario
            );

            if (!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            // Confere a senha atual
            const senhaCorreta = await bcrypt.compare(
                senhaAtual,
                usuario.senha_usuario
            );

            if (!senhaCorreta) {
                return res.status(401).json({
                    mensagem: "A senha atual está incorreta"
                });
            }

            // Verifica se a nova senha é igual à atual
            const mesmaSenha = await bcrypt.compare(
                novaSenha,
                usuario.senha_usuario
            );

            if (mesmaSenha) {
                return res.status(400).json({
                    mensagem: "A nova senha deve ser diferente da senha atual"
                });
            }

            // Criptografa a nova senha
            const senhaHash = await bcrypt.hash(novaSenha, 10);

            // Atualiza no banco
            await UsuarioModel.atualizarSenha(
                usuario.id_usuario,
                senhaHash
            );

            return res.status(200).json({
                mensagem: "Senha alterada com sucesso!"
            });

        } catch (erro) {

            console.error("ERRO AO ALTERAR SENHA:", erro);

            return res.status(500).json({
                mensagem: "Erro ao alterar senha"
            });
        }
    }

    static async alterarStatus(req, res) {
        try {

            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            if (req.session.usuario.tipo_usuario !== "Administrador") {
                return res.status(403).json({
                    mensagem: "Acesso permitido apenas para administradores"
                });
            }

            const { id } = req.params;
            const { status_usuario } = req.body;

            if (!["ativo", "inativo"].includes(status_usuario)) {
                return res.status(400).json({
                    mensagem: "Status inválido"
                });
            }

            if (Number(id) === req.session.usuario.id_usuario) {
                return res.status(400).json({
                    mensagem: "Você não pode desativar sua própria conta"
                });
            }

            const resultado = await UsuarioModel.alterarStatus(
                id,
                status_usuario
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            return res.status(200).json({
                mensagem:
                    status_usuario === "ativo"
                        ? "Conta ativada com sucesso!"
                        : "Conta desativada com sucesso!"
            });

        } catch (erro) {

            console.error("ERRO AO ALTERAR STATUS:", erro);

            return res.status(500).json({
                mensagem: "Erro ao alterar status da conta"
            });
        }
    }

    static async logout(req, res) {

        req.session.destroy((erro) => {

            if (erro) {

                console.error(
                    "ERRO AO FAZER LOGOUT:",
                    erro
                );

                return res.status(500).json({
                    mensagem: "Erro ao sair da conta"
                });
            }

            res.clearCookie("connect.sid");

            return res.status(200).json({
                mensagem: "Logout realizado com sucesso"
            });
        });
    }

}

module.exports = UsuarioController;