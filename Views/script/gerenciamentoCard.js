console.log("GERENCIAMENTO CARD JS CARREGADO!");

// =========================
// LISTAR CURSOS
// =========================
async function carregarCursos() {

    try {

        const resposta = await fetch("/cards/", {
            credentials: "include"
        });

        const cursos = await resposta.json();

        console.log("CURSOS RECEBIDOS:", cursos);

        if (!resposta.ok) {
            alert(cursos.mensagem || "Erro ao carregar cursos");
            return;
        }

        const lista = document.getElementById("lista-cursos");

        lista.innerHTML = "";

        cursos.forEach((curso) => {

            const div = document.createElement("div");

            div.classList.add("course");

            div.innerHTML = `
                <div class="course-info">
                    <img
    src="/uploads/img/${curso.imagem_curso}"
    alt="${curso.nome_curso}"
>

                    <div>
                        <h3>${curso.nome_curso}</h3>
                    </div>
                </div>

                <div>
                    ${curso.autor || "Não informado"}
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
                        <i class="bi bi-pencil-square"></i>
                    </button>

                    <button
                        class="delete"
                        onclick="excluirCurso(${curso.id_curso})"
                    >
                        <i class="bi bi-trash3"></i>
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

        const resposta = await fetch(`/cards/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

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

        carregarCursos();

    } catch (erro) {

        console.error("ERRO AO EXCLUIR:", erro);

        alert("Não foi possível conectar ao servidor.");
    }
}


// =========================
// EDITAR CURSO
// =========================
let cursoEditando = null;
let novaImagem = null;
let novaGrade = null;

const trocarImagem =
    document.getElementById("trocarImagem");

const editarImagem =
    document.getElementById("editarImagem");

const trocarGrade =
    document.getElementById("trocarGrade");

const editarGrade =
    document.getElementById("editarGrade");


trocarImagem.addEventListener("click", () => {
    editarImagem.click();
});


trocarGrade.addEventListener("click", () => {
    editarGrade.click();
});


editarImagem.addEventListener("change", () => {

    if (editarImagem.files.length > 0) {

        novaImagem = editarImagem.files[0];

        const nome =
            document.getElementById("nomeImagemEditar");

        const tamanho =
            document.getElementById("tamanhoImagemEditar");

        nome.textContent = novaImagem.name;

        tamanho.textContent =
            `${(novaImagem.size / 1024).toFixed(0)} KB`;

        console.log(
            "Nova imagem:",
            novaImagem.name
        );
    }

});


editarGrade.addEventListener("change", () => {

    if (editarGrade.files.length > 0) {

        novaGrade = editarGrade.files[0];

        const nome =
            document.getElementById("nomeGradeEditar");

        const tamanho =
            document.getElementById("tamanhoGradeEditar");

        nome.textContent = novaGrade.name;

        tamanho.textContent =
            `${(novaGrade.size / 1024).toFixed(0)} KB`;

        console.log(
            "Nova grade:",
            novaGrade.name
        );
    }

});


// =========================
// EDITAR CURSO
// =========================

async function editarCurso(id) {

    console.log("Editando curso:", id);

    try {

        const resposta = await fetch(`/cards/${id}`, {
            credentials: "include"
        });

        const curso = await resposta.json();

        console.log("CURSO PARA EDITAR:", curso);

        if (!resposta.ok) {

            alert(
                curso.mensagem ||
                "Erro ao buscar curso"
            );

            return;
        }

        cursoEditando = id;

        const nomeImagem =
    document.getElementById("nomeImagemEditar");

const tamanhoImagem =
    document.getElementById("tamanhoImagemEditar");

const nomeGrade =
    document.getElementById("nomeGradeEditar");

const tamanhoGrade =
    document.getElementById("tamanhoGradeEditar");


if (curso.imagem_curso) {

    nomeImagem.textContent =
        curso.imagem_curso;

    tamanhoImagem.textContent =
        "Arquivo atual";
} else {

    nomeImagem.textContent =
        "Nenhuma imagem selecionada";

    tamanhoImagem.textContent =
        "—";
}


if (curso.grade_curso) {

    nomeGrade.textContent =
        curso.grade_curso;

    tamanhoGrade.textContent =
        "Arquivo atual";
} else {

    nomeGrade.textContent =
        "Nenhuma grade selecionada";

    tamanhoGrade.textContent =
        "—";
}

        // =========================
        // PREENCHER CAMPOS
        // =========================

        document.getElementById("editarNomeCurso").value =
            curso.nome_curso || "";

        document.getElementById("editarModalidade").value =
            curso.modalidade_curso || "";

        document.getElementById("editarDescricao").value =
            curso.descricao_curso || "";

        document.getElementById("editarCargaHoraria").value =
            curso.cargaHoraria_curso || "";

        document.getElementById("editarCategoria").value =
            curso.categoria_curso || "";

        document.getElementById("editarLocal").value =
            curso.local_curso || "";

        document.getElementById("editarValor").value =
            curso.valor_curso || 0;

        document.getElementById("editarStatus").value =
            curso.status_curso || "";


        // =========================
        // TURNOS
        // =========================

        document.getElementById("editarManha").checked = false;
        document.getElementById("editarTarde").checked = false;
        document.getElementById("editarNoite").checked = false;


        const turno = (curso.turno_curso || "").toLowerCase();

        if (turno.includes("manhã") || turno.includes("manha")) {
            document.getElementById("editarManha").checked = true;
        }

        if (turno.includes("tarde")) {
            document.getElementById("editarTarde").checked = true;
        }

        if (turno.includes("noite")) {
            document.getElementById("editarNoite").checked = true;
        }


        // =========================
        // ABRIR MODAL
        // =========================

        document
            .getElementById("modalEditar")
            .classList.add("ativo");

    } catch (erro) {

        console.error(
            "ERRO AO BUSCAR CURSO PARA EDITAR:",
            erro
        );

        alert(
            "Não foi possível carregar os dados do curso."
        );
    }
}


// =========================
// CONTROLES DO MODAL
// =========================
const modalEditar =
    document.getElementById("modalEditar");

const fecharModal =
    document.getElementById("fecharModal");

const cancelarModal =
    document.getElementById("cancelarModal");

const salvarModal =
    document.getElementById("salvarModal");


// FECHAR NO X
fecharModal.addEventListener("click", () => {

    modalEditar.classList.remove("ativo");

});


// FECHAR NO CANCELAR
cancelarModal.addEventListener("click", () => {

    modalEditar.classList.remove("ativo");

});

salvarModal.addEventListener("click", async () => {

    if (!cursoEditando) {
        alert("Nenhum curso selecionado.");
        return;
    }


    // =========================
    // TURNOS
    // =========================

    const turnos = [];

    if (document.getElementById("editarManha").checked) {
        turnos.push("Manhã");
    }

    if (document.getElementById("editarTarde").checked) {
        turnos.push("Tarde");
    }

    if (document.getElementById("editarNoite").checked) {
        turnos.push("Noite");
    }


    // =========================
    // FORM DATA
    // =========================

    const formData = new FormData();

    formData.append(
        "nome_curso",
        document.getElementById("editarNomeCurso").value.trim()
    );

    formData.append(
        "modalidade_curso",
        document.getElementById("editarModalidade").value
    );

    formData.append(
        "descricao_curso",
        document.getElementById("editarDescricao").value.trim()
    );

    formData.append(
        "cargaHoraria_curso",
        document.getElementById("editarCargaHoraria").value
    );

    formData.append(
        "categoria_curso",
        document.getElementById("editarCategoria").value
    );

    formData.append(
        "turno_curso",
        turnos.join(", ")
    );

    formData.append(
        "local_curso",
        document.getElementById("editarLocal").value.trim()
    );

    formData.append(
        "valor_curso",
        document.getElementById("editarValor").value
    );

    formData.append(
        "status_curso",
        document.getElementById("editarStatus").value
    );


    // =========================
    // IMAGEM
    // =========================

    if (novaImagem) {

        formData.append(
            "imagem_curso",
            novaImagem
        );
    }


    // =========================
    // PDF
    // =========================

    if (novaGrade) {

        formData.append(
            "grade_curso",
            novaGrade
        );
    }


    try {

        const resposta = await fetch(
            `/cards/${cursoEditando}`,
            {
                method: "PATCH",
                credentials: "include",
                body: formData
            }
        );


        const resultado = await resposta.json();

        console.log(
            "RESPOSTA DA EDIÇÃO:",
            resultado
        );


        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Erro ao atualizar curso"
            );

            return;
        }


        alert(
            "Curso atualizado com sucesso!"
        );


        modalEditar.classList.remove("ativo");

        cursoEditando = null;
        novaImagem = null;
        novaGrade = null;

        editarImagem.value = "";
        editarGrade.value = "";

        carregarCursos();


    } catch (erro) {

        console.error(
            "ERRO AO EDITAR CURSO:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }

});

carregarCursos();