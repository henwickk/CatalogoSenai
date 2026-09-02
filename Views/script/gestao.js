// MODAL
const modal = document.querySelector(".modalSection")
const btnsEdit = document.querySelectorAll(".btnEdit")
const fecharModal = document.querySelector(".fecharModal")
const btnFechar = document.querySelector(".btnFechar")

btnsEdit.forEach(botao => {
    botao.addEventListener("click", () => {
        modal.classList.add("ativo")
    })

});

fecharModal.addEventListener("click", () => {
    modal.classList.remove("ativo");
})

btnFechar.addEventListener("click", () => {
    modal.classList.remove("ativo");
})