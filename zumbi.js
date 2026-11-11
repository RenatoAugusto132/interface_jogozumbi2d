document.addEventListener("DOMContentLoaded", () => {

    const camada = document.getElementById("camada-zumbis");

    if (!camada) {
        console.error("Camada dos zumbis não encontrada!");
        return;
    }

    
    const zumbisIniciais = 4;
    const maximoZumbis = 12;


    const intervaloAumento = 30000;
    const zumbisPorIntervalo = 1;

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

    
    function atualizarZumbi(zumbi, dt) {

        zumbi.x += zumbi.dx * zumbi.velocidade * dt;
        zumbi.y += zumbi.dy * zumbi.velocidade * dt;

        const largura = window.innerWidth;
        const altura = window.innerHeight;

        
        const visivel =
            zumbi.x + tamanhoZumbi > 0 &&
            zumbi.x < largura &&
            zumbi.y + tamanhoZumbi > 0 &&
            zumbi.y < altura;

        if (visivel) {
            zumbi.entrouNaTela = true;
        }

        
        if (zumbi.entrouNaTela && !visivel) {
            novaRota(zumbi);
        }

        
        const angulo = Math.atan2(
            zumbi.dy,
            zumbi.dx
        ) * 180 / Math.PI;

        zumbi.elemento.style.transform =
            `translate3d(${zumbi.x}px, ${zumbi.y}px, 0)
             rotate(${angulo}deg)`;
    }

    
        const inicioSessao = Date.now();

        
        function atualizarQuantidadeZumbis() {

            const tempoDecorrido = Date.now() - inicioSessao;

            
            const intervalosPassados = Math.floor(
                tempoDecorrido / intervaloAumento
            );

            
            const quantidadeDesejada = Math.min(
                maximoZumbis,
                zumbisIniciais +
                intervalosPassados * zumbisPorIntervalo
            );

            
            while (zumbis.length < quantidadeDesejada) {
                zumbis.push(criarZumbi());
            }
        }

        
        atualizarQuantidadeZumbis();

        
       
        const temporizadorZumbis = setInterval(() => {

            atualizarQuantidadeZumbis();

           
            if (zumbis.length >= maximoZumbis) {
                clearInterval(temporizadorZumbis);
            }

        }, 1000);

    
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

    
    requestAnimationFrame(animar);

});