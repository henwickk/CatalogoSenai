console.log("GERENCIAMENTO CARD JS CARREGADO!");
const filtros = document.querySelectorAll(".filter");
const filtroCategoria = document.getElementById("categoria_curso");
const inputPesquisa = document.getElementById("inputPesquisa");

// =========================
// LISTAR CURSOS
// =========================

async function carregarCursos() {

    try {

        const resposta = await fetch("/cards/gerenciamento", {
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
            div.dataset.turnos = curso.turno_curso || "";
            div.dataset.categoria = curso.categoria_curso || "";
            div.dataset.nome = curso.nome_curso || "";
            div.dataset.autor = curso.autor || "";

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

        console.error(
            "ERRO AO CARREGAR CURSOS:",
            erro
        );

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

        console.log(
            "RESPOSTA DA EXCLUSÃO:",
            resultado
        );

        if (!resposta.ok) {

            alert(
                resultado.erro ||
                resultado.mensagem ||
                "Erro ao excluir curso"
            );

            return;
        }

        alert(
            "Curso excluído com sucesso!"
        );

        carregarCursos();

    } catch (erro) {

        console.error(
            "ERRO AO EXCLUIR:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );

    }
}


// =========================
// EDITAR CURSO
// =========================

let cursoEditando = null;

let novaImagem = null;

let novaGrade = null;


// =========================
// ELEMENTOS DOS ARQUIVOS
// =========================

const trocarImagem =
    document.getElementById("trocarImagem");

const editarImagem =
    document.getElementById("editarImagem");

const trocarGrade =
    document.getElementById("trocarGrade");

const editarGrade =
    document.getElementById("editarGrade");


// =========================
// TROCAR IMAGEM
// =========================

trocarImagem.addEventListener("click", () => {

    editarImagem.click();

});


// =========================
// TROCAR GRADE
// =========================

trocarGrade.addEventListener("click", () => {

    editarGrade.click();

});


// =========================
// NOVA IMAGEM SELECIONADA
// =========================

editarImagem.addEventListener("change", () => {

    if (editarImagem.files.length > 0) {

        novaImagem = editarImagem.files[0];

        const nome =
            document.getElementById(
                "nomeImagemEditar"
            );

        const tamanho =
            document.getElementById(
                "tamanhoImagemEditar"
            );

        nome.textContent =
            novaImagem.name;

        tamanho.textContent =
            `${(novaImagem.size / 1024).toFixed(0)} KB`;

        console.log(
            "Nova imagem:",
            novaImagem.name
        );

    }

});


// =========================
// NOVA GRADE SELECIONADA
// =========================

editarGrade.addEventListener("change", () => {

    if (editarGrade.files.length > 0) {

        novaGrade = editarGrade.files[0];

        const nome =
            document.getElementById(
                "nomeGradeEditar"
            );

        const tamanho =
            document.getElementById(
                "tamanhoGradeEditar"
            );

        nome.textContent =
            novaGrade.name;

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

    console.log(
        "Editando curso:",
        id
    );

    try {

        const resposta = await fetch(
            `/cards/${id}`,
            {
                credentials: "include"
            }
        );

        const curso =
            await resposta.json();

        console.log(
            "CURSO PARA EDITAR:",
            curso
        );

        if (!resposta.ok) {

            alert(
                curso.mensagem ||
                "Erro ao buscar curso"
            );

            return;
        }


        // =========================
        // DEFINIR CURSO
        // =========================

        cursoEditando = id;


        // =========================
        // LIMPAR ARQUIVOS NOVOS
        // =========================

        novaImagem = null;

        novaGrade = null;

        editarImagem.value = "";

        editarGrade.value = "";


        // =========================
        // ELEMENTOS DOS ARQUIVOS
        // =========================

        const nomeImagem =
            document.getElementById(
                "nomeImagemEditar"
            );

        const tamanhoImagem =
            document.getElementById(
                "tamanhoImagemEditar"
            );

        const nomeGrade =
            document.getElementById(
                "nomeGradeEditar"
            );

        const tamanhoGrade =
            document.getElementById(
                "tamanhoGradeEditar"
            );


        // =========================
        // IMAGEM ATUAL
        // =========================

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


        // =========================
        // GRADE ATUAL
        // =========================

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

        document.getElementById(
            "editarNomeCurso"
        ).value =
            curso.nome_curso || "";


        document.getElementById(
            "editarModalidade"
        ).value =
            curso.modalidade_curso || "";


        document.getElementById(
            "editarDescricao"
        ).value =
            curso.descricao_curso || "";


        document.getElementById(
            "editarCargaHoraria"
        ).value =
            curso.cargaHoraria_curso || "";


        document.getElementById(
            "editarCategoria"
        ).value =
            curso.categoria_curso || "";


        document.getElementById(
            "editarLocal"
        ).value =
            curso.local_curso || "";

        const dataInicio = curso.dataPrevInicio_curso;

        document.getElementById(
            "editarDataInicio"
        ).value =
            dataInicio ? dataInicio.substring(0, 10) : "";


        document.getElementById(
            "editarValor"
        ).value =
            curso.valor_curso || 0;


        document.getElementById(
            "editarStatus"
        ).value =
            curso.status_curso || "";


        // =========================
        // TURNOS
        // =========================

        document.getElementById(
            "editarManha"
        ).checked = false;

        document.getElementById(
            "editarTarde"
        ).checked = false;

        document.getElementById(
            "editarNoite"
        ).checked = false;


        const turno =
            (curso.turno_curso || "")
                .toLowerCase();


        if (
            turno.includes("manhã") ||
            turno.includes("manha")
        ) {

            document.getElementById(
                "editarManha"
            ).checked = true;

        }


        if (turno.includes("tarde")) {

            document.getElementById(
                "editarTarde"
            ).checked = true;

        }


        if (turno.includes("noite")) {

            document.getElementById(
                "editarNoite"
            ).checked = true;

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
    document.getElementById(
        "modalEditar"
    );

const fecharModal =
    document.getElementById(
        "fecharModal"
    );

const cancelarModal =
    document.getElementById(
        "cancelarModal"
    );

const salvarModal =
    document.getElementById(
        "salvarModal"
    );


// =========================
// FECHAR NO X
// =========================

fecharModal.addEventListener(
    "click",
    () => {

        modalEditar.classList.remove(
            "ativo"
        );

    }
);


// =========================
// FECHAR NO CANCELAR
// =========================

cancelarModal.addEventListener(
    "click",
    () => {

        modalEditar.classList.remove(
            "ativo"
        );

    }
);


// =========================
// SALVAR ALTERAÇÕES
// =========================

salvarModal.addEventListener(
    "click",
    async () => {

        if (!cursoEditando) {

            alert(
                "Nenhum curso selecionado."
            );

            return;
        }


        // =========================
        // TURNOS
        // =========================

        const turnos = [];


        if (
            document.getElementById(
                "editarManha"
            ).checked
        ) {

            turnos.push("Manhã");

        }


        if (
            document.getElementById(
                "editarTarde"
            ).checked
        ) {

            turnos.push("Tarde");

        }


        if (
            document.getElementById(
                "editarNoite"
            ).checked
        ) {

            turnos.push("Noite");

        }


        // =========================
        // FORM DATA
        // =========================

        const formData =
            new FormData();


        formData.append(
            "nome_curso",
            document
                .getElementById(
                    "editarNomeCurso"
                )
                .value
                .trim()
        );


        formData.append(
            "modalidade_curso",
            document
                .getElementById(
                    "editarModalidade"
                )
                .value
        );


        formData.append(
            "descricao_curso",
            document
                .getElementById(
                    "editarDescricao"
                )
                .value
                .trim()
        );


        formData.append(
            "cargaHoraria_curso",
            document
                .getElementById(
                    "editarCargaHoraria"
                )
                .value
        );


        formData.append(
            "categoria_curso",
            document
                .getElementById(
                    "editarCategoria"
                )
                .value
        );


        formData.append(
            "turno_curso",
            turnos.join(", ")
        );


        formData.append(
            "local_curso",
            document
                .getElementById(
                    "editarLocal"
                )
                .value
                .trim()
        );

        formData.append(
            "dataPrevInicio_curso",
            document
                .getElementById(
                    "editarDataInicio"
                )
                .value
        );


        formData.append(
            "valor_curso",
            document
                .getElementById(
                    "editarValor"
                )
                .value
        );


        formData.append(
            "status_curso",
            document
                .getElementById(
                    "editarStatus"
                )
                .value
        );


        // =========================
        // IMAGEM NOVA
        // =========================

        if (novaImagem) {

            formData.append(
                "imagem_curso",
                novaImagem
            );

        }


        // =========================
        // GRADE NOVA
        // =========================

        if (novaGrade) {

            formData.append(
                "grade_curso",
                novaGrade
            );

        }


        // =========================
        // ENVIAR PARA O SERVIDOR
        // =========================

        try {

            const resposta =
                await fetch(
                    `/cards/${cursoEditando}`,
                    {
                        method: "PATCH",
                        credentials: "include",
                        body: formData
                    }
                );


            const resultado =
                await resposta.json();


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


            // =========================
            // LIMPAR E FECHAR
            // =========================

            modalEditar.classList.remove(
                "ativo"
            );


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

    }
);


filtros.forEach((filtro) => {

    filtro.addEventListener("click", () => {

        const valor = filtro.dataset.value;

        if (valor === "Todos") {

            const todosAtivo = filtro.classList.contains("active");

            filtros.forEach((btn) => {
                btn.classList.toggle("active", !todosAtivo);
            });

        } else {

            filtro.classList.toggle("active");

            const turnos = Array.from(filtros)
                .filter(btn => btn.dataset.value !== "Todos");

            const todos = document.querySelector('[data-value="Todos"]');

            if (turnos.every(btn => btn.classList.contains("active"))) {
                todos.classList.add("active");
            } else {
                todos.classList.remove("active");
            }
        }

        filtrarCursos();
    });

});

// BOTOES TURNO 

filtroCategoria.addEventListener("change", () => {
    filtrarCursos();
});

inputPesquisa.addEventListener("input", () => {
    filtrarCursos();
});

// FILTRO CATEGORIA
function filtrarCursos() {

    const cards = document.querySelectorAll(".course");

    const turnosSelecionados = Array.from(
        document.querySelectorAll(".filter.active")
    )
        .filter(btn => btn.dataset.value !== "Todos")
        .map(btn => btn.dataset.value);

    const categoriaSelecionada = filtroCategoria.value;

    const pesquisa = inputPesquisa.value
        .toLowerCase()
        .trim();


    cards.forEach((card) => {

        // =========================
        // CATEGORIA
        // =========================

        const categoriaCurso =
            card.dataset.categoria || "";

        const categoriaOk =
            categoriaSelecionada === "" ||
            categoriaCurso === categoriaSelecionada;


        // =========================
        // TURNOS
        // =========================

        const turnosDoCurso =
            (card.dataset.turnos || "")
                .split(",")
                .map(turno => turno.trim());

        let turnoOk = false;

        if (turnosSelecionados.length === 0) {

            turnoOk = false;

        } else if (turnosSelecionados.length === 3) {

            turnoOk = true;

        } else {

            turnoOk = turnosSelecionados.some(
                turno => turnosDoCurso.includes(turno)
            );

        }


        // =========================
        // PESQUISA
        // =========================

        const nomeCurso =
            (card.dataset.nome || "").toLowerCase();

        const autorCurso =
            (card.dataset.autor || "").toLowerCase();

        const pesquisaOk =
            pesquisa === "" ||
            nomeCurso.includes(pesquisa) ||
            autorCurso.includes(pesquisa);


        // =========================
        // RESULTADO
        // =========================

        card.style.display =
            categoriaOk &&
                turnoOk &&
                pesquisaOk
                ? ""
                : "none";

    });
}

// =========================
// CARREGAR CURSOS
// =========================

carregarCursos();