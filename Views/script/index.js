// =========================
// MODO ESCURO
// =========================

const botaoTema = document.querySelector("#temaEscuro")
const iconeTema = botaoTema.querySelector("i")

function aplicarTema(tema) {

    if (tema === "dark") {

        document.documentElement.setAttribute("data-theme", "dark")

        iconeTema.classList.remove("bi-moon-stars-fill")
        iconeTema.classList.add("bi-sun-fill")

    } else {

        document.documentElement.removeAttribute("data-theme")

        iconeTema.classList.remove("bi-sun-fill")
        iconeTema.classList.add("bi-moon-stars-fill")
    }
}

const temaSalvo = localStorage.getItem("tema")

if (temaSalvo) {
    aplicarTema(temaSalvo)
}

botaoTema.addEventListener("click", () => {

    const temaAtual =
        document.documentElement.getAttribute("data-theme")

    const novoTema =
        temaAtual === "dark" ? "light" : "dark"

    localStorage.setItem("tema", novoTema)

    aplicarTema(novoTema)
})


// =========================
// ANIMAÇÃO DO NAVBAR
// =========================

const secoes = document.querySelectorAll(
    "#banner, #Cursos, #Sobre, #Contatos"
)

const linksNav = document.querySelectorAll(
    "nav .animacao"
)

function atualizarNavbar() {

    let secaoAtual = ""

    secoes.forEach(secao => {

        const topo =
            secao.getBoundingClientRect().top

        if (topo <= 200) {
            secaoAtual = secao.id
        }

    })

    // Quando chegar no final da página

    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
    ) {
        secaoAtual = "Contatos"
    }

    linksNav.forEach(link => {

        link.classList.remove("ativo")

        if (
            link.getAttribute("href") ===
            `#${secaoAtual}`
        ) {
            link.classList.add("ativo")
        }

    })
}

window.addEventListener(
    "scroll",
    atualizarNavbar
)

atualizarNavbar()


// =========================
// ESCONDER CARDS
// =========================

const cardsCurso =
    document.querySelectorAll(".card-curso")

const verTodos =
    document.querySelector("#verTodos")

let cursosAbertos = false


function definirLimiteCards() {

    const limite =
        window.innerWidth <= 768 ? 4 : 8

    cardsCurso.forEach((card, indice) => {

        if (
            !cursosAbertos &&
            indice >= limite
        ) {

            card.classList.add("oculto")

        } else {

            card.classList.remove("oculto")
        }

    })


    if (cursosAbertos) {

        verTodos.innerHTML =
            'Ver menos <i class="bi bi-chevron-up"></i>'

    } else {

        verTodos.innerHTML =
            'Ver todos os cursos <i class="bi bi-chevron-down"></i>'
    }
}


definirLimiteCards()


verTodos.addEventListener("click", () => {

    cursosAbertos = !cursosAbertos

    definirLimiteCards()
})


window.addEventListener("resize", () => {

    if (!cursosAbertos) {
        definirLimiteCards()
    }

})


// =========================
// NAVBAR MOBILE
// =========================

const hamburguer =
    document.querySelector("#hamburguer")

const nav =
    document.querySelector("header nav")

const iconeHamburguer =
    hamburguer.querySelector("i")


hamburguer.addEventListener("click", () => {

    nav.classList.toggle("menuAberto")

    if (
        nav.classList.contains("menuAberto")
    ) {

        iconeHamburguer.classList.remove(
            "bi-list"
        )

        iconeHamburguer.classList.add(
            "bi-x-lg"
        )

    } else {

        iconeHamburguer.classList.remove(
            "bi-x-lg"
        )

        iconeHamburguer.classList.add(
            "bi-list"
        )
    }

})


// =========================
// FECHAR MENU AO CLICAR
// =========================

const linksMenu =
    nav.querySelectorAll("a")


linksMenu.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("menuAberto")

        iconeHamburguer.classList.remove(
            "bi-x-lg"
        )

        iconeHamburguer.classList.add(
            "bi-list"
        )

    })

})


// =========================
// FECHAR MENU CLICANDO FORA
// =========================

document.addEventListener("click", evento => {

    if (

        nav.classList.contains("menuAberto") &&

        !nav.contains(evento.target) &&

        !hamburguer.contains(evento.target)

    ) {

        nav.classList.remove("menuAberto")

        iconeHamburguer.classList.remove(
            "bi-x-lg"
        )

        iconeHamburguer.classList.add(
            "bi-list"
        )
    }

})