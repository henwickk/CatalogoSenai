const listaCursos = document.getElementById("cursos");

async function carregarCursos() {
    try {
        const resposta = await fetch("http://localhost:3000/cards/");

        const cursos = await resposta.json();

        console.log("CURSOS RECEBIDOS:", cursos);

        listaCursos.innerHTML = "";

        cursos.forEach((curso) => {
            // vamos montar cada card aqui
        });

    } catch (erro) {
        console.error("ERRO AO CARREGAR CURSOS:", erro);
    }
}

carregarCursos();