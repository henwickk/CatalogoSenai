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

    // Pega todos os turnos selecionados
    const turnosSelecionados = [...document.querySelectorAll(".shift.active")]
        .map((turno) => turno.dataset.value);

    const dados = {
        nome_curso: document.getElementById("nome_curso").value,

        turno_curso: turnosSelecionados.join(", "),

        descricao_curso: document.getElementById("descricao_curso").value,
        
        grade_curso: null,

        modalidade_curso: document.getElementById("modalidade_curso").value,

        status_curso: document.getElementById("status_curso").value,

        cargaHoraria_curso: document.getElementById("cargaHoraria_curso").value,

        categoria_curso: document.getElementById("categoria_curso").value,

        valor_curso: document.getElementById("valor_curso").value,

        imagem_curso: null,

        local_curso: document.getElementById("local_curso").value
    };

    // Mostra no console o que está sendo enviado
    console.log("DADOS DO CARD:", dados);

    try {
        const resposta = await fetch("http://localhost:3000/cards/", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        console.log("RESPOSTA DO SERVIDOR:", resultado);

        if (!resposta.ok) {
            alert("Erro: " + (resultado.erro || "Erro ao cadastrar"));
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
