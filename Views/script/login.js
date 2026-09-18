const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const senha = document.getElementById("senha_usuario");
const mostrarSenha = document.getElementById("mostrarSenha");


mostrarSenha.addEventListener("click", () => {

    if (senha_usuario.type === "password") {
        senha_usuario.type = "text";

        mostrarSenha.innerHTML = `
            <i class="bi bi-eye-slash"></i>
        `;
    } else {
        senha_usuario.type = "password";

        mostrarSenha.innerHTML = `
            <i class="bi bi-eye"></i>
        `;
    }

});

formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome_usuario = document.getElementById("nome_usuario").value;
    const senha_usuario = document.getElementById("senha_usuario").value;

    try {
        const resposta = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome_usuario,
                senha_usuario
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagemLogin.textContent = dados.mensagem;
            return;
        }

        console.log("Login realizado:", dados);

        window.location.href = "gerenciamentoCard.html";

    } catch (erro) {
        console.error(erro);

        mensagemLogin.textContent =
            "Erro ao conectar com o servidor.";
    }
});