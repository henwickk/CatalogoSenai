const input = document.getElementById("imagem");
const preview = document.getElementById("preview");

input.addEventListener("change", () => {
    const arquivo = input.files[0];

    if (!arquivo) return;

    preview.src = URL.createObjectURL(arquivo);
});