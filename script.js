const contraste = document.getElementById('alto-contraste');
const textoGrande = document.getElementById('texto-grande');


contraste.addEventListener('change', () => {
    document.body.classList.toggle(
        'alto-contraste', 
        contraste.checked);
});

textoGrande.addEventListener('change', () => {
    document.documentElement.classList.toggle(
        'texto-grande', 
        textoGrande.checked);
});

