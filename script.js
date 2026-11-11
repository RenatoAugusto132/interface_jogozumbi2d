document.addEventListener("DOMContentLoaded", () => {

    
    const contraste = document.getElementById("alto-contraste");
    const textoGrande = document.getElementById("texto-grande");

    
    const chaveContraste = "zumbi2d-alto-contraste";
    const chaveTexto = "zumbi2d-texto-grande";

    
    function aplicarPreferencias() {

        const contrasteAtivo =
            localStorage.getItem(chaveContraste) === "true";

        const textoAtivo =
            localStorage.getItem(chaveTexto) === "true";

        
        document.body.classList.toggle(
            "alto-contraste",
            contrasteAtivo
        );

        
        document.documentElement.classList.toggle(
            "texto-grande",
            textoAtivo
        );

        
        if (contraste) {
            contraste.checked = contrasteAtivo;
        }

        if (textoGrande) {
            textoGrande.checked = textoAtivo;
        }
    }

    
    if (contraste) {

        contraste.addEventListener("change", () => {

            localStorage.setItem(
                chaveContraste,
                String(contraste.checked)
            );

            aplicarPreferencias();
        });
    }

    
    if (textoGrande) {

        textoGrande.addEventListener("change", () => {

            localStorage.setItem(
                chaveTexto,
                String(textoGrande.checked)
            );

            aplicarPreferencias();
        });
    }

    
    window.addEventListener("storage", (evento) => {

        if (
            evento.key === chaveContraste ||
            evento.key === chaveTexto ||
            evento.key === null
        ) {
            aplicarPreferencias();
        }
    });

    // Recupera as preferências ao abrir a página
    aplicarPreferencias();

});
