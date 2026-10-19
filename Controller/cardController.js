
const CardModel = require("../Models/cardModel");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// Envia um arquivo da memória para o Cloudinary
function enviarParaCloudinary(arquivo, pasta, resourceType) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: pasta,
                resource_type: resourceType
            },
            (erro, resultado) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(resultado);
            }
        );

        Readable.from(arquivo.buffer).pipe(stream);
    });
}

// Exclui um arquivo do Cloudinary
async function excluirDoCloudinary(publicId, resourceType) {
    if (!publicId) return;

    return cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
        invalidate: true
    });
}

class CardController {

    static async criar(req, res) {
        const arquivosEnviados = [];

        try {
            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            const dados = { ...req.body };

            dados.dataPrevInicio_curso = dados.data_inicio_curso;
            dados.fk_usuario = req.session.usuario.id_usuario;

            const imagem = req.files?.imagem_curso?.[0];
            const grade = req.files?.grade_curso?.[0];

            if (!imagem || !grade) {
                return res.status(400).json({
                    mensagem: "Envie a imagem do curso e a grade curricular em PDF."
                });
            }

            if (imagem.mimetype !== "image/jpeg" &&
                imagem.mimetype !== "image/png" &&
                imagem.mimetype !== "image/webp") {
                return res.status(400).json({
                    mensagem: "A imagem deve ser JPG, PNG ou WEBP."
                });
            }

            if (grade.mimetype !== "application/pdf") {
                return res.status(400).json({
                    mensagem: "A grade curricular deve ser um PDF."
                });
            }

            const imagemCloud = await enviarParaCloudinary(
                imagem,
                "catalogosenai/imagens",
                "image"
            );

            arquivosEnviados.push({
                publicId: imagemCloud.public_id,
                resourceType: "image"
            });

            const gradeCloud = await enviarParaCloudinary(
                grade,
                "catalogosenai/grades",
                "raw"
            );

            arquivosEnviados.push({
                publicId: gradeCloud.public_id,
                resourceType: "raw"
            });

            dados.imagem_curso = imagemCloud.secure_url;
            dados.imagem_public_id = imagemCloud.public_id;

            dados.grade_curso = gradeCloud.secure_url;
            dados.grade_public_id = gradeCloud.public_id;

            const resultado = await CardModel.criar(dados);

            return res.status(201).json({
                mensagem: "Card criado com sucesso!",
                id: resultado.insertId
            });

        } catch (erro) {
            console.error("ERRO AO CRIAR CARD:", erro);

            // Se o cadastro falhar, tenta remover os arquivos enviados
            await Promise.allSettled(
                arquivosEnviados.map(arquivo =>
                    excluirDoCloudinary(
                        arquivo.publicId,
                        arquivo.resourceType
                    )
                )
            );

            return res.status(500).json({
                mensagem: "Erro ao criar o card"
            });
        }
    }

    static async listarTodos(req, res) {
        try {
            const cursos = await CardModel.listarTodos();
            return res.status(200).json(cursos);
        } catch (erro) {
            console.error("ERRO AO LISTAR CARDS:", erro);
            return res.status(500).json({
                mensagem: "Erro ao buscar os cards"
            });
        }
    }

    static async listarGerenciamento(req, res) {
        try {
            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            const usuario = req.session.usuario;

            const cursos =
                usuario.tipo_usuario === "Administrador"
                    ? await CardModel.listarTodos()
                    : await CardModel.listarPorUsuario(usuario.id_usuario);

            return res.status(200).json(cursos);

        } catch (erro) {
            console.error("ERRO AO LISTAR CARDS PARA GERENCIAMENTO:", erro);
            return res.status(500).json({
                mensagem: "Erro ao buscar os cards"
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const curso = await CardModel.buscarPorId(req.params.id);

            if (!curso) {
                return res.status(404).json({
                    mensagem: "Card não encontrado"
                });
            }

            return res.status(200).json(curso);

        } catch (erro) {
            console.error("ERRO AO ENCONTRAR CARD:", erro);
            return res.status(500).json({
                mensagem: "Erro ao buscar o card"
            });
        }
    }

    static async editar(req, res) {
        const arquivosEnviados = [];

        try {
            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            const { id } = req.params;
            const usuario = req.session.usuario;
            const dados = { ...req.body };

            const cursoAnterior = await CardModel.buscarPorId(id);

            if (!cursoAnterior) {
                return res.status(404).json({
                    mensagem: "Card não encontrado"
                });
            }

            if (
                usuario.tipo_usuario !== "Administrador" &&
                cursoAnterior.fk_usuario !== usuario.id_usuario
            ) {
                return res.status(403).json({
                    mensagem: "Você não tem permissão para editar este card"
                });
            }

            if (dados.data_inicio_curso !== undefined) {
                dados.dataPrevInicio_curso = dados.data_inicio_curso;
                delete dados.data_inicio_curso;
            }

            const imagem = req.files?.imagem_curso?.[0];
            const grade = req.files?.grade_curso?.[0];

            if (imagem) {
                if (!["image/jpeg", "image/png", "image/webp"].includes(imagem.mimetype)) {
                    return res.status(400).json({
                        mensagem: "A imagem deve ser JPG, PNG ou WEBP."
                    });
                }

                const imagemCloud = await enviarParaCloudinary(
                    imagem,
                    "catalogosenai/imagens",
                    "image"
                );

                arquivosEnviados.push({
                    publicId: imagemCloud.public_id,
                    resourceType: "image"
                });

                dados.imagem_curso = imagemCloud.secure_url;
                dados.imagem_public_id = imagemCloud.public_id;
            }

            if (grade) {
                if (grade.mimetype !== "application/pdf") {
                    return res.status(400).json({
                        mensagem: "A grade curricular deve ser um PDF."
                    });
                }

                const gradeCloud = await enviarParaCloudinary(
                    grade,
                    "catalogosenai/grades",
                    "raw"
                );

                arquivosEnviados.push({
                    publicId: gradeCloud.public_id,
                    resourceType: "raw"
                });

                dados.grade_curso = gradeCloud.secure_url;
                dados.grade_public_id = gradeCloud.public_id;
            }

            const resultado = await CardModel.editar(
                id,
                dados,
                usuario.id_usuario,
                usuario.tipo_usuario
            );

            if (resultado === null) {
                await Promise.allSettled(
                    arquivosEnviados.map(arquivo =>
                        excluirDoCloudinary(arquivo.publicId, arquivo.resourceType)
                    )
                );

                return res.status(400).json({
                    mensagem: "Nenhum campo válido foi enviado para atualização"
                });
            }

            // Só remove os arquivos antigos depois que o banco atualiza
            if (resultado.affectedRows > 0) {
                if (imagem && cursoAnterior.imagem_public_id) {
                    await excluirDoCloudinary(
                        cursoAnterior.imagem_public_id,
                        "image"
                    );
                }

                if (grade && cursoAnterior.grade_public_id) {
                    await excluirDoCloudinary(
                        cursoAnterior.grade_public_id,
                        "raw"
                    );
                }
            }

            return res.status(200).json({
                mensagem: "Card atualizado com sucesso!"
            });

        } catch (erro) {
            console.error("ERRO AO EDITAR CARD:", erro);

            await Promise.allSettled(
                arquivosEnviados.map(arquivo =>
                    excluirDoCloudinary(arquivo.publicId, arquivo.resourceType)
                )
            );

            return res.status(500).json({
                mensagem: "Erro ao atualizar o card"
            });
        }
    }

    static async deletar(req, res) {
        try {
            if (!req.session.usuario) {
                return res.status(401).json({
                    mensagem: "Usuário não está logado"
                });
            }

            const { id } = req.params;
            const usuario = req.session.usuario;

            const curso = await CardModel.buscarPorId(id);

            if (!curso) {
                return res.status(404).json({
                    mensagem: "Card não encontrado"
                });
            }

            if (
                usuario.tipo_usuario !== "Administrador" &&
                curso.fk_usuario !== usuario.id_usuario
            ) {
                return res.status(403).json({
                    mensagem: "Você não tem permissão para excluir este card"
                });
            }

            const resultado = await CardModel.deletar(
                id,
                usuario.id_usuario,
                usuario.tipo_usuario
            );

            if (resultado.affectedRows === 0) {
                return res.status(403).json({
                    mensagem: "Não foi possível excluir este card"
                });
            }

            // O curso já foi removido do banco; agora removemos os arquivos
            const exclusoes = await Promise.allSettled([
                excluirDoCloudinary(curso.imagem_public_id, "image"),
                excluirDoCloudinary(curso.grade_public_id, "raw")
            ]);

            exclusoes.forEach((resultadoExclusao) => {
                if (resultadoExclusao.status === "rejected") {
                    console.error(
                        "Falha ao excluir arquivo do Cloudinary:",
                        resultadoExclusao.reason
                    );
                }
            });

            return res.status(200).json({
                mensagem: "Card deletado com sucesso!"
            });

        } catch (erro) {
            console.error("ERRO AO DELETAR CARD:", erro);
            return res.status(500).json({
                mensagem: "Erro ao deletar o card"
            });
        }
    }
}

module.exports = CardController;
