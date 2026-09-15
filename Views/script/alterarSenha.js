const modalSenha =
    document.getElementById("modalSenha");

const fecharModalSenha =
    document.getElementById("fecharModalSenha");

const cancelarModalSenha =
    document.getElementById("cancelarModalSenha");

const salvarSenha =
    document.getElementById("salvarSenha");

const senhaAtual =
    document.getElementById("senhaAtual");

const novaSenha =
    document.getElementById("novaSenha");

const confirmarNovaSenha =
    document.getElementById("confirmarNovaSenha");


fecharModalSenha.addEventListener("click", () => {
    modalSenha.classList.remove("ativo");
});


cancelarModalSenha.addEventListener("click", () => {
    modalSenha.classList.remove("ativo");
});


modalSenha.addEventListener("click", (evento) => {

    if (evento.target === modalSenha) {
        modalSenha.classList.remove("ativo");
    }

});


salvarSenha.addEventListener("click", async () => {

    const atual = senhaAtual.value;
    const nova = novaSenha.value;
    const confirmacao = confirmarNovaSenha.value;

    if (!atual || !nova || !confirmacao) {
        alert("Preencha todos os campos.");
        return;
    }

    if (nova !== confirmacao) {
        alert("As novas senhas não coincidem.");
        return;
    }

    try {

        const resposta = await fetch(
            "/usuarios/alterar-senha",
            {
                method: "PUT",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    senhaAtual: atual,
                    novaSenha: nova
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao alterar senha.");
            return;
        }

        alert("Senha alterada com sucesso!");

        senhaAtual.value = "";
        novaSenha.value = "";
        confirmarNovaSenha.value = "";

        modalSenha.classList.remove("ativo");

    } catch (erro) {

        console.error(
            "ERRO AO ALTERAR SENHA:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }

});