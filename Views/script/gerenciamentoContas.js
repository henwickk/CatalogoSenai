const modalConta = document.getElementById("modalConta");

const btnNovaConta = document.getElementById("btnNovaConta");

const fecharModal = document.getElementById("fecharModal");

const cancelarModal = document.getElementById("cancelarModal");

const tituloModal = document.getElementById("tituloModal");

const listaUsuarios = document.getElementById("lista-usuarios");

const contadorContas = document.getElementById("contadorContas");

const nomeUsuario = document.getElementById("nomeUsuario");
const senhaUsuario = document.getElementById("senhaUsuario");
const confirmarSenha = document.getElementById("confirmarSenha");
const salvarConta = document.getElementById("salvarConta");



// =========================
// ABRIR MODAL - NOVA CONTA
// =========================

btnNovaConta.addEventListener("click", () => {

    tituloModal.textContent = "Nova conta";

    modalConta.classList.add("ativo");

});



// =========================
// FECHAR MODAL
// =========================

fecharModal.addEventListener("click", () => {

    modalConta.classList.remove("ativo");

});


cancelarModal.addEventListener("click", () => {

    modalConta.classList.remove("ativo");

});



// =========================
// FECHAR CLICANDO FORA
// =========================

modalConta.addEventListener("click", (evento) => {

    if (evento.target === modalConta) {

        modalConta.classList.remove("ativo");

    }

});



// =========================
// CARREGAR USUÁRIOS DO BANCO
// =========================

async function carregarUsuarios() {

    try {

        const resposta = await fetch("/usuarios", {
            credentials: "include"
        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem || "Erro ao buscar usuários");

            if (resposta.status === 403) {
                window.location.href = "gerenciamentoCard.html";
            }

            return;
        }

        listaUsuarios.innerHTML = "";

        dados.forEach(usuario => {

            const divUsuario = document.createElement("div");

            divUsuario.classList.add("usuario");

            divUsuario.dataset.usuarioId = usuario.id_usuario;

            const inicial =
                usuario.nome_usuario.charAt(0).toUpperCase();

            const textoCursos =
                usuario.cursos_cadastrados == 1
                    ? "1 curso"
                    : `${usuario.cursos_cadastrados} cursos`;

            const statusClasse =
                usuario.status_usuario === "ativo"
                    ? "ativo"
                    : "inativo";

            const textoStatus =
                usuario.status_usuario === "ativo"
                    ? "Ativo"
                    : "Inativo";

            divUsuario.innerHTML = `

                <div class="usuario-info">

                    <div class="avatar-tabela">
                        ${inicial}
                    </div>

                    <div class="usuario-dados">

                        <strong class="usuario-nome">
                            ${usuario.nome_usuario}
                        </strong>

                    </div>

                </div>


                <div class="cursos-cadastrados">
                    ${textoCursos}
                </div>


                <div class="usuario-status">

                    <span class="status ${statusClasse}">
                        ${textoStatus}
                    </span>

                </div>


                <div class="acoes">

                    <button
                        type="button"
                        class="delete btn-desativar"
                    >
                        ${
                            usuario.status_usuario === "ativo"
                                ? "Desativar conta"
                                : "Ativar conta"
                        }
                    </button>

                </div>

            `;

            listaUsuarios.appendChild(divUsuario);

        });


        contadorContas.textContent =
            `${dados.length} ${dados.length === 1 ? "conta" : "contas"} cadastradas`;


    } catch (erro) {

        console.error("ERRO AO CARREGAR USUÁRIOS:", erro);

        alert("Não foi possível carregar os usuários.");

    }

}

// =========================
// SALVAR NOVA CONTA
// =========================

salvarConta.addEventListener("click", async () => {

    const nome = nomeUsuario.value.trim();
    const senha = senhaUsuario.value;
    const confirmacao = confirmarSenha.value;

    // Verifica nome e senha
    if (!nome || !senha || !confirmacao) {
        alert("Preencha todos os campos.");
        return;
    }

    // Verifica se as senhas são iguais
    if (senha !== confirmacao) {
        alert("As senhas não coincidem.");
        return;
    }

    try {

        const resposta = await fetch("/usuarios", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome_usuario: nome,
                senha_usuario: senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem || "Erro ao criar conta.");
            return;
        }

        alert("Conta criada com sucesso!");

        // Limpa os campos
        nomeUsuario.value = "";
        senhaUsuario.value = "";
        confirmarSenha.value = "";

        // Fecha o modal
        modalConta.classList.remove("ativo");

        // Atualiza a tabela
        carregarUsuarios();

    } catch (erro) {

        console.error("ERRO AO CRIAR CONTA:", erro);

        alert("Não foi possível conectar ao servidor.");
    }
});


carregarUsuarios();

listaUsuarios.addEventListener("click", async (evento) => {

    const botao = evento.target.closest(".btn-desativar");

    if (!botao) return;

    const usuarioDiv = botao.closest(".usuario");

    const id = usuarioDiv.dataset.usuarioId;

    const estaAtivo =
        botao.textContent.trim() === "Desativar conta";

    const novoStatus =
        estaAtivo ? "inativo" : "ativo";

    const confirmacao = confirm(
        estaAtivo
            ? "Tem certeza que deseja desativar esta conta?"
            : "Deseja ativar esta conta?"
    );

    if (!confirmacao) return;

    try {

        const resposta = await fetch(
            `/usuarios/${id}/status`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status_usuario: novoStatus
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(
                dados.mensagem ||
                "Erro ao alterar conta"
            );
            return;
        }

        alert(dados.mensagem);

        carregarUsuarios();

    } catch (erro) {

        console.error(
            "ERRO AO ALTERAR STATUS:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
});