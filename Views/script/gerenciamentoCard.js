console.log("GERENCIAMENTO CARD JS CARREGADO!");

// =========================
// LISTAR CURSOS
// =========================

async function carregarCursos() {

    try {

        const resposta = await fetch("http://localhost:3000/cards/");

        const cursos = await resposta.json();

        console.log("CURSOS RECEBIDOS:", cursos);

        const lista = document.getElementById("lista-cursos");

        lista.innerHTML = "";

        cursos.forEach((curso) => {

            const div = document.createElement("div");

            div.classList.add("course");

            div.innerHTML = `
                <div class="course-info">

                    <img
                        src="/uploads/imagens/${curso.imagem_curso}"
                        alt="${curso.nome_curso}"
                    />

                    <div>
                        <h3>${curso.nome_curso}</h3>
                    </div>

                </div>

                <div>
                    ${curso.categoria_curso}
                </div>

                <div>
                    <span class="shift morning">
                        ${curso.turno_curso}
                    </span>
                </div>

                <div>
                    <span class="status published">
                        ${curso.status_curso}
                    </span>
                </div>

                <div class="actions">

                    <button
                        class="edit"
                        onclick="editarCurso(${curso.id_curso})"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="delete"
                        onclick="excluirCurso(${curso.id_curso})"
                    >
                        <i class="fa-regular fa-trash-can"></i>
                    </button>

                </div>
            `;

            lista.appendChild(div);

        });

    } catch (erro) {

        console.error("ERRO AO CARREGAR CURSOS:", erro);

    }

}


// =========================
// EXCLUIR CURSO
// =========================

async function excluirCurso(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este curso?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `http://localhost:3000/cards/${id}`,
            {
                method: "DELETE"
            }
        );

        const resultado = await resposta.json();

        console.log("RESPOSTA DA EXCLUSÃO:", resultado);

        if (!resposta.ok) {

            alert(
                resultado.erro ||
                resultado.mensagem ||
                "Erro ao excluir curso"
            );

            return;
        }

        alert("Curso excluído com sucesso!");

        // Atualiza a lista
        carregarCursos();

    } catch (erro) {

        console.error("ERRO AO EXCLUIR:", erro);

        alert("Não foi possível conectar ao servidor.");

    }

}


// =========================
// EDITAR CURSO
// =========================

function editarCurso(id) {

    console.log("Editar curso:", id);

    alert("Curso selecionado para edição: " + id);

}


// =========================
// CARREGAR AO ABRIR A PÁGINA
// =========================

carregarCursos();