// MODO ESCURO
const botaoTema = document.querySelector("#temaEscuro");
const iconeTema = botaoTema.querySelector("i");

function aplicarTema(tema) {

    if (tema === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");

        iconeTema.classList.remove("bi-moon-stars-fill");
        iconeTema.classList.add("bi-sun-fill");

    } else {
        document.documentElement.removeAttribute("data-theme");

        iconeTema.classList.remove("bi-sun-fill");
        iconeTema.classList.add("bi-moon-stars-fill");
    }
}

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo) {
    aplicarTema(temaSalvo);
}

botaoTema.addEventListener("click", () => {

    const temaAtual =
        document.documentElement.getAttribute("data-theme");

    const novoTema = temaAtual === "dark" ? "light" : "dark";

    localStorage.setItem("tema", novoTema);

    aplicarTema(novoTema);
});

//  ANIMAÇÃO DO NAVBAR
const secoes = document.querySelectorAll("#banner, #Cursos, #Sobre, #Contatos");
const linksNav = document.querySelectorAll("nav .animacao");

function atualizarNavbar() {
    let secaoAtual = "";

    secoes.forEach(secao => {
        const topo = secao.getBoundingClientRect().top;

        if (topo <= 200) {
            secaoAtual = secao.id;
        }
    });

    // Quando chegar no final da página
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        secaoAtual = "Contatos";
    }

    linksNav.forEach(link => {
        link.classList.remove("ativo");

        if (link.getAttribute("href") === `#${secaoAtual}`) {
            link.classList.add("ativo");
        }
    });
}

window.addEventListener("scroll", atualizarNavbar);

atualizarNavbar();

// MODAL
const modal = document.querySelector(".modalSection")
const btnsSaibaMais = document.querySelectorAll(".saiba-mais")
const fecharModal = document.querySelector(".fecharModal")
const btnFechar = document.querySelector(".btnFechar")

btnsSaibaMais.forEach(botao => {
    botao.addEventListener("click", () => {
        modal.classList.add("ativo")
    })

});

fecharModal.addEventListener("click", () => {
    modal.classList.remove("ativo");
})

btnFechar.addEventListener("click", () => {
    modal.classList.remove("ativo");
})

// ESCONDER CARDS

const cardsCurso = document.querySelectorAll(".card-curso")
const verTodos = document.querySelector("#verTodos")
cardsCurso.forEach((card, indice) => {
            if (indice >= 8) {
                // esconder card
                card.classList.add("oculto");
                verTodos.innerHTML = 'Ver todos os cursos <i class="bi bi-chevron-down"></i></i>'
            }
        });

let cursosAbertos = false
verTodos.addEventListener("click", () => {
    if (cursosAbertos) {
        cardsCurso.forEach((card, indice) => {
            if (indice >= 8) {
                // esconder card
                card.classList.add("oculto");
                verTodos.innerHTML = 'Ver todos os cursos <i class="bi bi-chevron-down"></i>';
            }
        });
    }else {
            cardsCurso.forEach((card, indice) => {

                if (indice >= 8) {
                    card.classList.remove("oculto");
                    verTodos.innerHTML = 'Ver menos <i class="bi bi-chevron-up"></i>';
                }

            });
        }
    cursosAbertos = !cursosAbertos;
});


