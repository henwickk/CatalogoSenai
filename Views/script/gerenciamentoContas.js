const modalConta = document.getElementById("modalConta");

const btnNovaConta = document.getElementById("btnNovaConta");
const fecharModal = document.getElementById("fecharModal");
const cancelarModal = document.getElementById("cancelarModal");

const tituloModal = document.getElementById("tituloModal");


// ABRIR MODAL PARA NOVA CONTA

btnNovaConta.addEventListener("click", () => {

    tituloModal.textContent = "Nova conta";

    modalConta.classList.add("ativo");

});


// FECHAR

fecharModal.addEventListener("click", () => {

    modalConta.classList.remove("ativo");

});


cancelarModal.addEventListener("click", () => {

    modalConta.classList.remove("ativo");

});


// FECHAR CLICANDO FORA

modalConta.addEventListener("click", (evento) => {

    if (evento.target === modalConta) {

        modalConta.classList.remove("ativo");

    }

});


// EDITAR

function editarUsuario(id) {

    console.log("Editar usuário:", id);

    tituloModal.textContent = "Editar conta";

    modalConta.classList.add("ativo");

}


// EXCLUIR

function excluirUsuario(id) {

    console.log("Excluir usuário:", id);

}