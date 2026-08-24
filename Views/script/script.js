const modal = document.querySelector(".modalSection")
const btnsSaibaMais = document.querySelector(".saiba-mais")
const fecharModal = document.querySelector(".fecharModal")

btnsSaibaMais.forEach(botao => {
    botao.addEventListener("click", () =>{
        modal.classList.add("ativo")
    })

});

fecharModal.addEventListener("click", ()=>{
    modal.classList.remove("ativo");
})

