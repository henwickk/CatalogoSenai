const CardModel = require("../Models/cardModel");

class CardController {

    // =========================
    // CRIAR CARD
    // =========================
    static async criar(req, res) {

        try {

            // Verifica se está logado
            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            const dados = req.body;

            dados.dataPrevInicio_curso = dados.data_inicio_curso;


            // =========================
            // IMAGEM
            // =========================
            if (req.files && req.files.imagem_curso) {

                dados.imagem_curso =
                    req.files.imagem_curso[0].filename;

            } else {

                dados.imagem_curso = null;

            }


            // =========================
            // GRADE
            // =========================
            if (req.files && req.files.grade_curso) {

                dados.grade_curso =
                    req.files.grade_curso[0].filename;

            } else {

                dados.grade_curso = null;

            }


            // =========================
            // USUÁRIO LOGADO
            // =========================
            dados.fk_usuario =
                req.session.usuario.id_usuario;


            // =========================
            // SALVAR NO BANCO
            // =========================
            const resultado =
                await CardModel.criar(dados);


            return res.status(201).json({

                mensagem: "Card criado com sucesso!",

                id: resultado.insertId

            });

        } catch (erro) {

            console.error("ERRO AO CRIAR CARD:", erro);

            return res.status(500).json({

                mensagem: "Erro ao criar o card"

            });

        }

    }


    // =========================
    // LISTAR CARDS
    // =========================
    static async listarTodos(req, res) {
        try {
            const cursos = await CardModel.listarTodos();

            return res.status(200).json(cursos);

        } catch (erro) {
            console.error(
                "ERRO AO LISTAR CARDS:",
                erro
            );

            return res.status(500).json({
                mensagem: "Erro ao buscar os cards"
            });
        }
    }

    // =========================
    // LISTAR CARDS PARA GERENCIAMENTO
    // =========================

    static async listarGerenciamento(req, res) {
        try {

            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            const usuario = req.session.usuario;

            let cursos;

            if (usuario.tipo_usuario === "Administrador") {

                cursos = await CardModel.listarTodos();

            } else {

                cursos = await CardModel.listarPorUsuario(
                    usuario.id_usuario
                );

            }

            return res.status(200).json(cursos);

        } catch (erro) {

            console.error(
                "ERRO AO LISTAR CARDS PARA GERENCIAMENTO:",
                erro
            );

            return res.status(500).json({
                mensagem: "Erro ao buscar os cards"
            });
        }
    }


    // =========================
    // BUSCAR CARD POR ID
    // =========================
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const curso = await CardModel.buscarPorId(id);

            if (!curso) {
                return res.status(404).json({
                    mensagem: "Card não encontrado"
                });
            }

            return res.status(200).json(curso);

        } catch (erro) {
            console.error(
                "ERRO AO ENCONTRAR CARD:",
                erro
            );

            return res.status(500).json({
                mensagem: "Erro ao buscar o card"
            });
        }
    }


    // =========================
    // EDITAR CARD
    // =========================
    static async editar(req, res) {

        try {

            if (!req.session.usuario) {

                return res.status(401).json({

                    mensagem: "Usuário não está logado"

                });

            }


            const { id } = req.params;

            const dados = req.body;

            const usuario =
                req.session.usuario;

            if (req.files && req.files.imagem_curso) {
                dados.imagem_curso =
                    req.files.imagem_curso[0].filename;
            }

            if (req.files && req.files.grade_curso) {
                dados.grade_curso =
                    req.files.grade_curso[0].filename;
            }


            const resultado =
                await CardModel.editar(
                    id,
                    dados,
                    usuario.id_usuario,
                    usuario.tipo_usuario
                );


            if (resultado === null) {

                return res.status(400).json({

                    mensagem:
                        "Nenhum campo válido foi enviado para atualização"

                });

            }


            if (resultado.affectedRows === 0) {

                return res.status(403).json({

                    mensagem:
                        "Você não tem permissão para editar este card"

                });

            }


            return res.status(200).json({

                mensagem:
                    "Card atualizado com sucesso!"

            });


        } catch (erro) {

            console.error(
                "ERRO AO EDITAR CARD:",
                erro
            );

            return res.status(500).json({

                mensagem:
                    "Erro ao atualizar o card"

            });

        }

    }


    // =========================
    // DELETAR CARD
    // =========================
    static async deletar(req, res) {

        try {

            if (!req.session.usuario) {

                return res.status(401).json({

                    mensagem:
                        "Usuário não está logado"

                });

            }


            const { id } = req.params;

            const usuario =
                req.session.usuario;


            const resultado =
                await CardModel.deletar(
                    id,
                    usuario.id_usuario,
                    usuario.tipo_usuario
                );


            if (resultado.affectedRows === 0) {

                return res.status(403).json({

                    mensagem:
                        "Você não tem permissão para excluir este card"

                });

            }


            return res.status(200).json({

                mensagem:
                    "Card deletado com sucesso!"

            });


        } catch (erro) {

            console.error(
                "ERRO AO DELETAR CARD:",
                erro
            );

            return res.status(500).json({

                mensagem:
                    "Erro ao deletar o card"

            });

        }

    }

}

module.exports = CardController;