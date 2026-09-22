console.log("INDEX CARDS JS CARREGADO!");

const containerCursos = document.getElementById("cursos");

const modalCurso = document.getElementById("modalCurso");

const botaoBaixarGrade = document.getElementById("baixarGrade");

let cursos = [];

console.log("MODAL ENCONTRADO:", modalCurso);


async function carregarCursos() {

    try {

        console.log("COMEÇANDO A BUSCAR CURSOS...");

        const resposta = await fetch("http://localhost:3000/cards/");

        console.log("RESPOSTA:", resposta);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os cursos");
        }

        cursos = await resposta.json();

        console.log("CURSOS RECEBIDOS:", cursos);

        renderizarCursos(cursos);

    } catch (erro) {

        console.error("ERRO AO CARREGAR OS CURSOS:", erro);

    }
}


function renderizarCursos(listaCursos) {

    containerCursos.innerHTML = "";

    listaCursos.forEach((curso) => {

        console.log("CRIANDO CARD:", curso);

        const card = document.createElement("div");

        card.classList.add("card-curso");

        card.innerHTML = `
            <div class="imagemCurso">

                <img
                    src="/uploads/img/${curso.imagem_curso}"
                    alt="Curso de ${curso.nome_curso}"
                    class="img-curso"
                >

                <span class="${curso.status_curso === "Disponível"
                ? "status-card-disponivel"
                : "status-card-indisponivel"
            }">
    ${curso.status_curso}
</span>

            </div>

            <div class="infosCurso">

                <div class="textoCurso">

                    <h4>${curso.nome_curso}</h4>

                    <p>${curso.categoria_curso}</p>

                </div>

                <div class="dadosCurso">

                    <span>
                        <i class="bi bi-clock"></i>
                        ${curso.cargaHoraria_curso}h
                    </span>

                    <span>
                        ${curso.modalidade_curso}
                    </span>

                </div>

                <div class="turnosCurso">

                    <i class="bi bi-calendar3"></i>

                    <span>
                        ${curso.turno_curso}
                    </span>

                </div>

                <div class="rodapeCurso">

                    <strong>
    ${formatarValor(curso.valor_curso)}
</strong>

                    <button class="saiba-mais" type="button">
                        Saiba mais
                        <i class="bi bi-arrow-right"></i>
                    </button>

                </div>

            </div>
        `;

        containerCursos.appendChild(card);

        const botaoSaibaMais =
            card.querySelector(".saiba-mais");

        botaoSaibaMais.addEventListener("click", () => {
            abrirModal(curso);
        });

    });
}

function formatarValor(valor) {
    const valorTexto = String(valor ?? "").trim();

    // Campo vazio = gratuito
    if (valorTexto === "") {
        return "Gratuito";
    }

    // Se já tiver R$, não adiciona outro
    if (valorTexto.toUpperCase().startsWith("R$")) {
        return valorTexto;
    }

    return `R$ ${valorTexto}`;
}

// FILTRO
function filtrarCursos() {

    const categoria =
        document.getElementById("categoria").value;

    const pesquisa =
        document
            .getElementById("inputPesquisa")
            .value
            .toLowerCase()
            .trim();

    const cursosFiltrados = cursos.filter((curso) => {

        const nome =
            curso.nome_curso.toLowerCase();

        const categoriaCurso =
            curso.categoria_curso.toLowerCase();

        // Pesquisa
        const encontrouPesquisa =
            nome.includes(pesquisa) ||
            categoriaCurso.includes(pesquisa);

        // Categoria
        let encontrouCategoria = true;

        if (categoria === "tecnico") {

            encontrouCategoria =
                categoriaCurso === "técnico";

        } else if (categoria === "gratuito") {

            encontrouCategoria =
                Number(curso.valor_curso) === 0;

        } else if (categoria === "pago") {

            encontrouCategoria =
                Number(curso.valor_curso) > 0;

        }

        return encontrouPesquisa && encontrouCategoria;

    });

    renderizarCursos(cursosFiltrados);
}

function abrirModal(curso) {

    // Nome
    document.getElementById("modalNome").textContent =
        curso.nome_curso;

    // Resumo
    document.getElementById("modalResumo").textContent =
        curso.nome_curso;

    // Modalidade
    document.getElementById("modalModalidade").textContent =
        curso.modalidade_curso;

    document.getElementById("modalDetalheModalidade").textContent =
        curso.modalidade_curso;

    // Turnos
    document.getElementById("modalTurnos").textContent =
        curso.turno_curso;

    // Local
    document.getElementById("modalLocal").textContent =
        curso.local_curso;

    // Data prevista de início
    const dataInicio = curso.dataPrevInicio_curso;

    document.getElementById("dataInicioModal").textContent =
        dataInicio
            ? new Date(dataInicio).toLocaleDateString("pt-BR", {
                timeZone: "UTC"
            })
            : "A definir";

    // Valor
    document.getElementById("modalValor").textContent =
    formatarValor(curso.valor_curso);

    // Descrição
    document.getElementById("modalDescricao").textContent =
        curso.descricao_curso;

    // Carga horária
    document.getElementById("modalCargaHoraria").textContent =
        `${curso.cargaHoraria_curso} h`;

    // Categoria
    document.getElementById("modalCategoria").textContent =
        curso.categoria_curso;

    // Status
    const status = document.getElementById("modalStatus");

    if (curso.status_curso === "Disponível") {

        status.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        Disponível
    `;

        status.classList.remove("indisponivel");
        status.classList.add("disponivel");

    } else {

        status.innerHTML = `
        <i class="bi bi-x-circle-fill"></i>
        Indisponível
    `;

        status.classList.remove("disponivel");
        status.classList.add("indisponivel");
    }

    // Imagem
    document.getElementById("modalImagem").src =
        `/uploads/img/${curso.imagem_curso}`;

    // Botao baixar Grade

    botaoBaixarGrade.onclick = () => {

        if (!curso.grade_curso) {
            alert("Este curso não possui uma grade disponível.");
            return;
        }

        const link = document.createElement("a");

        link.href = `/uploads/grades/${curso.grade_curso}`;
        link.download = curso.grade_curso;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Abre o modal
    modalCurso.classList.add("ativo");

}


// Fechar pelo X
document
    .querySelector(".fecharModal")
    .addEventListener("click", () => {

        modalCurso.classList.remove("ativo");

    });


// Fechar pelo botão "Fechar"
document
    .querySelector(".btnFechar")
    .addEventListener("click", () => {

        modalCurso.classList.remove("ativo");

    });

document
    .getElementById("categoria")
    .addEventListener("change", filtrarCursos);

document
    .getElementById("inputPesquisa")
    .addEventListener("input", filtrarCursos);

carregarCursos();