document.addEventListener("DOMContentLoaded", () => {

    const camada = document.getElementById("camada-zumbis");

    if (!camada) {
        console.error("Camada dos zumbis não encontrada!");
        return;
    }

    
    const quantidadeZumbis = 4;
    const tamanhoZumbi = 80;
    const zumbis = [];

    
    function sortear(min, max) {
        return min + Math.random() * (max - min);
    }

    
    function novaRota(zumbi) {

        const largura = window.innerWidth;
        const altura = window.innerHeight;
        const margem = 20;

      
        const lado = Math.floor(Math.random() * 4);

        switch (lado) {

            case 0: 
                zumbi.x = -tamanhoZumbi - margem;
                zumbi.y = sortear(0, altura);
                break;

            case 1: 
                zumbi.x = largura + margem;
                zumbi.y = sortear(0, altura);
                break;

            case 2: 
                zumbi.x = sortear(0, largura);
                zumbi.y = -tamanhoZumbi - margem;
                break;

            case 3: 
                zumbi.x = sortear(0, largura);
                zumbi.y = altura + margem;
                break;
        }

        
        const destinoX = sortear(
            largura * 0.2,
            largura * 0.8
        );

        const destinoY = sortear(
            altura * 0.2,
            altura * 0.8
        );

       
        const dx = destinoX - zumbi.x;
        const dy = destinoY - zumbi.y;

        const distancia = Math.hypot(dx, dy) || 1;

        zumbi.dx = dx / distancia;
        zumbi.dy = dy / distancia;

        zumbi.entrouNaTela = false;
    }

    
    function criarZumbi() {

        const imagem = document.createElement("img");

        imagem.src = "./assets/zumbi-andando.gif";
        imagem.className = "zumbi-animado";
        imagem.alt = "";
        imagem.draggable = false;

        camada.appendChild(imagem);

        // Cada zumbi possui propriedades próprias
        const zumbi = {
            elemento: imagem,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            velocidade: sortear(70, 140),
            entrouNaTela: false
        };

        novaRota(zumbi);

        return zumbi;
    }

    // Movimenta um zumbi
    function atualizarZumbi(zumbi, dt) {

        zumbi.x += zumbi.dx * zumbi.velocidade * dt;
        zumbi.y += zumbi.dy * zumbi.velocidade * dt;

        const largura = window.innerWidth;
        const altura = window.innerHeight;

        // Verifica se o zumbi está dentro da tela
        const visivel =
            zumbi.x + tamanhoZumbi > 0 &&
            zumbi.x < largura &&
            zumbi.y + tamanhoZumbi > 0 &&
            zumbi.y < altura;

        if (visivel) {
            zumbi.entrouNaTela = true;
        }

        // Muda de rota somente após sair da tela
        if (zumbi.entrouNaTela && !visivel) {
            novaRota(zumbi);
        }

        // Rotação conforme a direção
        const angulo = Math.atan2(
            zumbi.dy,
            zumbi.dx
        ) * 180 / Math.PI;

        zumbi.elemento.style.transform =
            `translate3d(${zumbi.x}px, ${zumbi.y}px, 0)
             rotate(${angulo}deg)`;
    }

    // Cria os zumbis automaticamente
    for (let i = 0; i < quantidadeZumbis; i++) {
        zumbis.push(criarZumbi());
    }

    // Anima todos os zumbis continuamente
    let ultimoTempo = null;

    function animar(tempoAtual) {

        if (ultimoTempo === null) {
            ultimoTempo = tempoAtual;
        }

        const dt = Math.min(
            (tempoAtual - ultimoTempo) / 1000,
            0.05
        );

        ultimoTempo = tempoAtual;

        zumbis.forEach(zumbi => {
            atualizarZumbi(zumbi, dt);
        });

        requestAnimationFrame(animar);
    }

    // Inicia automaticamente ao carregar a página
    requestAnimationFrame(animar);

});