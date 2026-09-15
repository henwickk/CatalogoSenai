async function carregarUsuarioLogado() {

    try {

        const resposta = await fetch("/usuario/me", {
            credentials: "include"
        });

        if (!resposta.ok) {
            window.location.href = "login.html";
            return;
        }

        const dados = await resposta.json();
        const usuario = dados.usuario;

        // =========================
        // TOPBAR
        // =========================

        const nome = document.getElementById("nome-usuario");
        const avatar = document.getElementById("avatar-usuario");

        if (nome) {
            nome.textContent = usuario.nome_usuario;
        }

        if (avatar) {
            avatar.textContent =
                usuario.nome_usuario.charAt(0).toUpperCase();
        }


        // =========================
        // MENU DE CONTAS
        // =========================

        const menuContas =
            document.getElementById("menu-contas");

        if (menuContas) {

            if (usuario.tipo_usuario === "Administrador") {

                // ADMINISTRADOR
                menuContas.href = "/gerenciamentoContas.html";

                menuContas.innerHTML = `
                    <i class="bi bi-person-gear"></i>
                    <span>Gerenciar Contas</span>
                `;

            } else {

                // USUÁRIO NORMAL
                menuContas.href = "#";

                menuContas.innerHTML = `
    <i class="bi bi-key"></i>
    <span>Alterar Senha</span>
`;

                menuContas.addEventListener("click", (evento) => {
                    evento.preventDefault();

                    const modalSenha =
                        document.getElementById("modalSenha");

                    if (modalSenha) {
                        modalSenha.classList.add("ativo");
                    }
                });

            }

        }

    } catch (erro) {

        console.error(
            "Erro ao carregar usuário:",
            erro
        );

    }
}

carregarUsuarioLogado();

const btnLogout = document.getElementById("btnLogout");

if (btnLogout) {

    btnLogout.addEventListener("click", async (evento) => {

        evento.preventDefault();

        try {

            const resposta = await fetch("/logout", {
                method: "POST",
                credentials: "include"
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.mensagem ||
                    "Erro ao sair da conta."
                );
                return;
            }

            window.location.href = "/login.html";

        } catch (erro) {

            console.error(
                "ERRO AO FAZER LOGOUT:",
                erro
            );

            alert(
                "Não foi possível sair da conta."
            );
        }
    });
}