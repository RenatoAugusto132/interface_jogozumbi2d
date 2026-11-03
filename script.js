const contraste = document.getElementById('alto-contraste');
const textoGrande = document.getElementById('texto-grande');
const reduzirMovimento = document.getElementById('reduzir-movimento');

contraste.addEventListener('change', () => {
    document.body.classList.toggle(
        'alto-contraste', 
        contraste.checked);
});

textoGrande.addEventListener('change', () => {
    document.body.classList.toggle(
        'texto-grande', 
        textoGrande.checked);
});

reduzirMovimento.addEventListener('change', () => {
    document.body.classList.toggle(
        'reduzir-movimento', 
        reduzirMovimento.checked);
});
