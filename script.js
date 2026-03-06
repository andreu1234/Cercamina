const mida = 10;
let matriu = [];

function inicialitzarMatriu() {
    for (let i = 0; i < mida; i++) {
        matriu[i] = [];
        for (let j = 0; j < mida; j++) {
            matriu[i][j] = 0; // 0 = Negre / Apagat
        }
    }
}

function dibuixar(tipus) {
    inicialitzarMatriu();

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {

            if (tipus === 'creu') {
                if (i === 4 || j === 4) matriu[i][j] = 1;
            }
            else if (tipus === 'escacs') {
                if ((i + j) % 2 === 0) matriu[i][j] = 1;
            }
            else if (tipus === 'diagonal') {
                if (i === j) matriu[i][j] = 1;
            }
        }
    }
    renderitzar();
}

// Aquesta funció "dibuixa" els DIVs a l'HTML
function renderitzar() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            // Si a la matriu hi ha un 1, afegim la classe 'active' (color verd)
            if (matriu[i][j] === 1) {
                div.classList.add('active');
            }

            container.appendChild(div);
        }
    }
}

// Arrancada inicial
dibuixar('netejar');