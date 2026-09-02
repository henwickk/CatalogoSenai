const inputImagem = document.getElementById("imagem_curso");
const previewImagem = document.getElementById("preview-imagem");
const textoImagem = document.getElementById("texto-imagem");

inputImagem.addEventListener("change", () => {

    const arquivo = inputImagem.files[0];

    if (arquivo) {

        previewImagem.src = URL.createObjectURL(arquivo);

        previewImagem.style.display = "block";

        textoImagem.textContent = arquivo.name;

    }

});