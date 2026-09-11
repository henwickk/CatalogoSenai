console.log("INDEX CARDS JS CARREGADO!");

const containerCursos = document.getElementById("cursos");

const modalCurso = document.getElementById("modalCurso");

console.log("MODAL ENCONTRADO:", modalCurso);

// async function carregarCursos() {
//     try {
//         const resposta = await fetch("http://localhost:3000/cards/");

//         if (!resposta.ok) {
//             throw new Error("Erro ao buscar os cursos");
//         }

//         const cursos = await resposta.json();

//         console.log("CURSOS RECEBIDOS:", cursos);

//         containerCursos.innerHTML = "";

//         cursos.forEach((curso) => {

//             const card = document.createElement("div");
//             card.classList.add("card-curso");

//             // Define o status de disponibilidade
//             const disponivel =
//                 curso.status_curso === "Ativo";

//             card.innerHTML = `
//                 <div class="imagemCurso">

//                     <img
//                         src="/uploads/img/${curso.imagem_curso}"
//                         alt="Curso de ${curso.nome_curso}"
//                         class="img-curso"
//                     >

//                     <span class="disponivel ${disponivel ? "" : "indisponivel"}">
//                         ${disponivel ? "Disponível" : "Indisponível"}
//                     </span>

//                 </div>

//                 <div class="infosCurso">

//                     <div class="textoCurso">

//                         <h4>${curso.nome_curso}</h4>

//                         <p>
//                             ${curso.categoria_curso}
//                         </p>

//                     </div>

//                     <div class="dadosCurso">

//                         <span>
//                             <i class="bi bi-clock"></i>
//                             ${curso.cargaHoraria_curso}h
//                         </span>

//                         <span>
//                             ${curso.modalidade_curso}
//                         </span>

//                     </div>

//                     <div class="turnosCurso">

//                         <i class="bi bi-calendar3"></i>

//                         <span>
//                             ${curso.turno_curso}
//                         </span>

//                     </div>

//                     <div class="rodapeCurso">

//                         <strong>
//                             ${Number(curso.valor_curso) === 0
//                                         ? "Gratuito"
//                                         : `R$ ${Number(curso.valor_curso).toFixed(2).replace(".", ",")}`
//                                     }
//                         </strong>

//                         <button class="saiba-mais" type="button">
//                             Saiba mais
//                             <i class="bi bi-arrow-right"></i>
//                         </button>

//                     </div>
//             `;

//             containerCursos.appendChild(card);
//         });

//     } catch (erro) {
//         console.error("ERRO AO CARREGAR OS CURSOS:", erro);
//     }
// }

async function carregarCursos() {
    try {

        console.log("COMEÇANDO A BUSCAR CURSOS...");

        const resposta = await fetch("http://localhost:3000/cards/");

        console.log("RESPOSTA:", resposta);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os cursos");
        }

        const cursos = await resposta.json();

        console.log("CURSOS RECEBIDOS:", cursos);

        containerCursos.innerHTML = "";

        cursos.forEach((curso) => {

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

                    <span class="disponivel">
                        Disponível
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
                        <span>${curso.turno_curso}</span>
                    </div>

                    <div class="rodapeCurso">

                        <strong>
                            ${Number(curso.valor_curso) === 0
                    ? "Gratuito"
                    : `R$ ${Number(curso.valor_curso)
                        .toFixed(2)
                        .replace(".", ",")}`
                }
                        </strong>

                        <button class="saiba-mais" type="button">
                            Saiba mais
                            <i class="bi bi-arrow-right"></i>
                        </button>

                    </div>

                </div>
            `;

            containerCursos.appendChild(card);

            const botaoSaibaMais = card.querySelector(".saiba-mais");

            botaoSaibaMais.addEventListener("click", () => {
                abrirModal(curso);
            });
        });

    } catch (erro) {
        console.error("ERRO AO CARREGAR OS CURSOS:", erro);
    }
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

    // Valor
    document.getElementById("modalValor").textContent =
        Number(curso.valor_curso) === 0
            ? "Gratuito"
            : `R$ ${Number(curso.valor_curso)
                .toFixed(2)
                .replace(".", ",")}`;

    // Descrição
    document.getElementById("modalDescricao").textContent =
        curso.descricao_curso;

    // Carga horária
    document.getElementById("modalCargaHoraria").textContent =
        `${curso.cargaHoraria_curso} hrs`;

    // Categoria
    document.getElementById("modalCategoria").textContent =
        curso.categoria_curso;

    // Status
    const status = document.getElementById("modalStatus");

    if (curso.status_curso === "Ativo") {

        status.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            Disponível
        `;

        status.classList.remove("indisponivel");

    } else {

        status.innerHTML = `
            <i class="bi bi-x-circle-fill"></i>
            Indisponível
        `;

        status.classList.add("indisponivel");

    }

    // Imagem
    document.getElementById("modalImagem").src =
        `/uploads/img/${curso.imagem_curso}`;

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

carregarCursos();