const inputImagem = document.getElementById("imagem_curso");
const previewImagem = document.getElementById("preview-imagem");
const areaImagem = document.querySelector(".image-upload");
const botaoAlterarImagem = document.querySelector(".change-image");
const inputGrade = document.getElementById("grade-file");
const previewGrade = document.getElementById("grade-file-preview");
const nomeGrade = document.getElementById("grade-file-name");
const tamanhoGrade = document.getElementById("grade-file-size");
const removerGrade = document.getElementById("remove-grade-file");
const iconeGrade = document.getElementById("grade-upload-icon");

previewGrade.hidden = true;
previewGrade.style.display = "none";
iconeGrade.style.display = "flex";

const formatarTamanhoArquivo = (bytes) => {
    if (!bytes || Number(bytes) <= 0) return "0 KB";

    const unidades = ["B", "KB", "MB", "GB"];
    let tamanho = Number(bytes);
    let unidadeIndex = 0;

    while (tamanho >= 1024 && unidadeIndex < unidades.length - 1) {
        tamanho /= 1024;
        unidadeIndex++;
    }

    const casasDecimais = tamanho >= 100 || unidadeIndex === 0 ? 0 : 1;
    return `${tamanho.toFixed(casasDecimais)} ${unidades[unidadeIndex]}`;
};

const mostrarArquivoGrade = (arquivo) => {
    if (!arquivo) {
        previewGrade.hidden = true;
        previewGrade.style.display = "none";
        iconeGrade.style.display = "flex";
        return;
    }

    nomeGrade.textContent = arquivo.name;
    tamanhoGrade.textContent = formatarTamanhoArquivo(arquivo.size);
    previewGrade.hidden = false;
    previewGrade.style.display = "flex";
    iconeGrade.style.display = "none";
};

const limparArquivoGrade = () => {
    inputGrade.value = "";
    previewGrade.hidden = true;
    previewGrade.style.display = "none";
    nomeGrade.textContent = "";
    tamanhoGrade.textContent = "0 KB";
    iconeGrade.style.display = "flex";
};

botaoAlterarImagem.addEventListener("click", () => {
    inputImagem.click();
});

inputImagem.addEventListener("change", () => {

    const arquivo = inputImagem.files[0];

    if (arquivo) {

        previewImagem.src = URL.createObjectURL(arquivo);

        previewImagem.style.display = "block";
        areaImagem.classList.add("has-image");

    }

});

inputGrade.addEventListener("change", () => {
    const arquivo = inputGrade.files[0];

    if (!arquivo) {
        limparArquivoGrade();
        return;
    }

    const ehPdf = arquivo.type === "application/pdf" || arquivo.name.toLowerCase().endsWith(".pdf");

    if (!ehPdf) {
        alert("Selecione apenas um arquivo PDF para a grade curricular.");
        limparArquivoGrade();
        return;
    }

    mostrarArquivoGrade(arquivo);
});

removerGrade.addEventListener("click", () => {
    limparArquivoGrade();
});