const formulario = document.getElementById("formCard");

const botaoSalvar = formulario.querySelector(".save");

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

    botaoSalvar.classList.add("is-saving");


    // =========================
    // TURNOS SELECIONADOS
    // =========================

    const turnosSelecionados =
        [...document.querySelectorAll(".shift.active")]
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

    dados.append(
        "data_inicio_curso",
        document.getElementById("data_inicio_curso").value
    );


    // =========================
    // IMAGEM
    // =========================

    const imagem =
        document.getElementById("imagem_curso").files[0];

    if (imagem) {

        dados.append(
            "imagem_curso",
            imagem
        );

    }


    // =========================
    // GRADE
    // =========================

    const grade =
        document.getElementById("grade-file").files[0];

    if (grade) {

        dados.append(
            "grade_curso",
            grade
        );

    }

    if (!imagem || !grade) {
        alert("Selecione a imagem do curso e o PDF da grade curricular.");
        return;
    }


    console.log("DADOS DO CARD:", dados);


    try {

        const resposta = await fetch(
            "/cards/",
            {
                method: "POST",
                body: dados,
                credentials: "include"
            }
        );


        const resultado =
            await resposta.json();


        console.log(
            "RESPOSTA DO SERVIDOR:",
            resultado
        );


        if (!resposta.ok) {

            alert(
                "Erro: " +
                (resultado.mensagem ||
                    resultado.erro ||
                    "Erro ao cadastrar")
            );

            return;

        }


        alert(
            "Card criado com sucesso!"
        );


        formulario.reset();


        // Desmarca os turnos

        document
            .querySelectorAll(".shift.active")
            .forEach((turno) => {

                turno.classList.remove("active");

            });


    } catch (erro) {

        console.error(
            "ERRO NO FETCH:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor"
        );

    } finally {

        botaoSalvar.classList.remove(
            "is-saving"
        );

    }

});