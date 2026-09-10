const listaCursos = document.getElementById("cursos");

// Mapeamento dos elementos do Modal
const modalSection = document.getElementById("modalSection");
const btnFecharX = document.getElementById("btnFecharX");
const btnFecharTexto = document.getElementById("btnFecharTexto");

const modalImgContainer = document.getElementById("modalImgContainer");
const modalModalidadeBadging = document.getElementById("modalModalidadeBadging");
const modalTurnos = document.getElementById("modalTurnos");
const modalValor = document.getElementById("modalValor");

const modalTitulo = document.getElementById("modalTitulo");
const modalSubtitulo = document.getElementById("modalSubtitulo");
const modalDescricaoTexto = document.getElementById("modalDescricaoTexto");
const modalModalidade = document.getElementById("modalModalidade");
const modalCargaHoraria = document.getElementById("modalCargaHoraria");
const modalCategoria = document.getElementById("modalCategoria");
const modalDownloadGrade = document.getElementById("modalDownloadGrade");

// Função Principal de Busca
async function carregarCursos() {
    try {
        const resposta = await fetch("http://localhost:3000/cards/");
        const cursos = await resposta.json();

        console.log("CURSOS RECEBIDOS:", cursos);

        listaCursos.innerHTML = "";

        cursos.forEach((curso) => {
            const card = document.createElement("div");
            card.classList.add("card-curso");

            // Define o caminho da imagem de fundo ou fallback
            const imgPath = curso.imagem 
                ? curso.imagem 
                : (curso.foto ? `http://localhost:3000/uploads/${curso.foto}` : '/img/senai.jpg');

            // Estrutura HTML idêntica ao seu card de exemplo
            card.innerHTML = `
                <img src="${imgPath}" alt="${curso.nome || 'Curso'}" class="img-curso">
                <div class="infosCurso">
                    <div class="textoCurso">
                        <h4>${curso.nome || 'Sem título'}</h4>
                        <h5>${curso.modalidade || 'Curso'}</h5>
                    </div>
                    <button class="saiba-mais">
                        Saiba-mais <i class="bi bi-arrow-right"></i>
                    </button>
                </div>
            `;

            // Evento para abrir o modal com os dados deste curso
            const btnSaibaMais = card.querySelector(".saiba-mais");
            btnSaibaMais.addEventListener("click", () => abrirModal(curso, imgPath));

            listaCursos.appendChild(card);
        });

    } catch (erro) {
        console.error("ERRO AO CARREGAR CURSOS:", erro);
    }
}

// Preenche os dados dinâmicos do modal e ativa a exibição
function abrirModal(curso, imgPath) {
    if (modalImgContainer) {
        modalImgContainer.style.backgroundImage = `url('${imgPath}')`;
    }
    
    if (modalModalidadeBadging) modalModalidadeBadging.textContent = curso.modalidade || 'Curso';
    if (modalTurnos) modalTurnos.textContent = curso.turnos || 'Manhã, Tarde e Noite';
    if (modalValor) modalValor.textContent = curso.valor ? `R$ ${curso.valor}` : 'Gratuito';

    if (modalTitulo) modalTitulo.textContent = curso.nome || '';
    if (modalSubtitulo) modalSubtitulo.textContent = curso.subtitulo || `Curso em ${curso.nome || ''}`;
    if (modalDescricaoTexto) modalDescricaoTexto.textContent = curso.descricao || 'Sem descrição informada.';
    if (modalModalidade) modalModalidade.textContent = curso.modalidade || 'Não informada';
    if (modalCargaHoraria) modalCargaHoraria.textContent = curso.carga_horaria ? `${curso.carga_horaria}h` : 'N/A';
    if (modalCategoria) modalCategoria.textContent = curso.categoria || 'Geral';

    if (modalDownloadGrade) {
        if (curso.pdf_grade) {
            modalDownloadGrade.href = `http://localhost:3000/uploads/${curso.pdf_grade}`;
            modalDownloadGrade.style.display = "inline-block";
        } else {
            modalDownloadGrade.style.display = "none";
        }
    }

    modalSection.classList.add("ativo");
}

// Função para fechar o modal
function fecharModal() {
    modalSection.classList.remove("ativo");
}

// Eventos de Fechamento
if (btnFecharX) btnFecharX.addEventListener("click", fecharModal);
if (btnFecharTexto) btnFecharTexto.addEventListener("click", fecharModal);

// Fechar ao clicar na área escura fora do conteúdo
if (modalSection) {
    modalSection.addEventListener("click", (e) => {
        if (e.target === modalSection) {
            fecharModal();
        }
    });
}

// Inicializa a chamada da API
carregarCursos();