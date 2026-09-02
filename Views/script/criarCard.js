const formulario = document.getElementById("formCard");

console.log("CRIAR CARD JS CARREGADO!");


// =========================
// TURNOS
// =========================

const turnos = document.querySelectorAll(".shift");

turnos.forEach((turno) => {

    turno.addEventListener("click", () => {
        turno.classList.toggle("active");
    });

});


// =========================
// CADASTRO DO CARD
// =========================

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Pega os turnos selecionados
    const turnosSelecionados = [...document.querySelectorAll(".shift.active")]
        .map((turno) => turno.dataset.value);


    // =========================
    // FORMDATA
    // =========================

    const dados = new FormData();

    dados.append(
        "nome_curso",
        document.getElementById("nome_curso").value
    );

    dados.append(
        "turno_curso",
        turnosSelecionados.join(", ")
    );

    dados.append(
        "descricao_curso",
        document.getElementById("descricao_curso").value
    );

    dados.append(
        "modalidade_curso",
        document.getElementById("modalidade_curso").value
    );

    dados.append(
        "status_curso",
        document.getElementById("status_curso").value
    );

    dados.append(
        "cargaHoraria_curso",
        document.getElementById("cargaHoraria_curso").value
    );

    dados.append(
        "categoria_curso",
        document.getElementById("categoria_curso").value
    );

    dados.append(
        "valor_curso",
        document.getElementById("valor_curso").value
    );

    dados.append(
        "local_curso",
        document.getElementById("local_curso").value
    );


    // =========================
    // IMAGEM
    // =========================

    const imagem = document.getElementById("imagem_curso").files[0];

    if (imagem) {
        dados.append("imagem_curso", imagem);
    }


    // =========================
    // GRADE
    // =========================

    const grade = document.getElementById("grade-file").files[0];

    if (grade) {
        dados.append("grade_curso", grade);
    }


    // Mostra no console
    console.log("DADOS DO CARD:", dados);


    try {

        const resposta = await fetch("http://localhost:3000/cards/", {

            method: "POST",

            // NÃO colocar Content-Type aqui!
            body: dados

        });


        const resultado = await resposta.json();

        console.log("RESPOSTA DO SERVIDOR:", resultado);


        if (!resposta.ok) {

            alert(
                "Erro: " +
                (resultado.erro || "Erro ao cadastrar")
            );

            return;
        }


        alert("Card criado com sucesso!");

        formulario.reset();


        // Desmarca os turnos
        document.querySelectorAll(".shift.active").forEach((turno) => {
            turno.classList.remove("active");
        });


    } catch (erro) {

        console.error("ERRO NO FETCH:", erro);

        alert("Não foi possível conectar ao servidor");

    }

});

