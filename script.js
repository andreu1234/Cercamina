const mida = 10;
let matriu = [];
let mines = 15;
let resposta = []
let banderes = 0
const missatgeDisplay = document.getElementById("missatge");
let punts = 0

// Arrancada inicial
inicialitzarMatriu();
renderitzar();
colocarMines()

// Inici de la martiu
function inicialitzarMatriu() {
    for (let i = 0; i < mida; i++) {
        matriu[i] = [];
        resposta[i] = [];
        for (let j = 0; j < mida; j++) {
            matriu[i][j] = 0;
            resposta[i][j] = '';
        }

    }
}
// Missatge que ens mostra cuan no hem comensat encara
missatgeDisplay.textContent = 'Fes click per començar a jugar'

//Calcula on estan ubicades les mines
function colocarMines() {
    inicialitzarMatriu()
    let contador = 0
    for (let i = 0; contador < mines; i++) {
        let x = Math.trunc(Math.random() * mida);
        let y = Math.trunc(Math.random() * mida);
        if (matriu[x][y]!=='*'){
            matriu[x][y] = '*';
            resposta[x][y] = '*';
            contador++
            console.log(contador, i)
        }
    }
    renderitzar();
    console.table(matriu)
    missatgeDisplay.textContent = 'Fes click per començar a jugar'
    banderes = 15
}

// Dibuixa els DIVs a l'HTML
function renderitzar() {
    const container = document.getElementById('grid-container');
    container.innerHTML = "";

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.addEventListener('click', function () {
                missatgeDisplay.textContent = ``;
                missatgeDisplay.textContent = banderes + '🚩';

                if (!div.classList.contains('bandera')) {
                    if (matriu[i][j] === '*') {
                        div.classList.add('mina');
                        //Missatge que ens mostra quan hem perdut
                        missatgeDisplay.textContent = `Has perdut`;
                        mostrarResposta()
                    } else if (matriu[i][j] === 0) {
                        if (!div.classList.contains('active2')) {
                            div.classList.add('active2');
                            punts++

                            let p = document.createElement("p")
                            let numero =calcularBombesProperes(i, j);
                            console.log(numero)
                            if(punts === mida*mida-mines) {
                                missatgeDisplay.textContent = `Has guanyat`;}
                            //Posar color als nombres (estètica)
                            p.innerText = numero
                            resposta[i][j] = numero;
                            p.textContent = numero;
                            switch (numero) {
                                case 1: p.style.color = 'blue'; break;
                                case 2: p.style.color = 'green'; break;
                                case 3: p.style.color = 'red'; break;
                                case 4: p.style.color = 'purple'; break;
                                case 5: p.style.color = 'orange'; break;
                                case 6: p.style.color = 'brown'; break;
                                case 7: p.style.color = 'yellow'; break;
                                case 8: p.style.color = 'black'; break;
                            }
                            div.appendChild(p);
                        }
                    }
                }
                })
            //Cuant pots posar banderes i cuan no
            div.addEventListener('auxclick', function () {
                if (!div.classList.contains('active2')) {
                    if (div.classList.contains('bandera')) {
                        div.classList.remove('bandera');
                        div.innerText = '';
                        banderes++

                    }else{
                        div.classList.add('bandera');
                        div.innerText = '🚩';
                        banderes--
                    }
                    //Mostrar les benderes que t'he queden
                    missatgeDisplay.textContent = ``;
                    missatgeDisplay.textContent = banderes + '🚩';

                }

            })
            container.appendChild(div);
        }}
}
//Calcuar numero per saber si hi ha bombes properes
function calcularBombesProperes(i,j) {
    let bombes=0;
    if (matriu[i-1]?.[j-1]==='*') bombes++;
    if (matriu[i-1]?.[j+1]==='*') bombes++;
    if (matriu[i-1]?.[j]==='*') bombes++;
    if (matriu[i]?.[j+1]==='*') bombes++;
    if (matriu[i]?.[j-1]==='*') bombes++;
    if (matriu[i+1]?.[j+1]==='*') bombes++;
    if (matriu[i+1]?.[j-1]==='*') bombes++;
    if (matriu[i+1]?.[j]==='*') bombes++;
    return bombes;
}

//Cuant perds et mostra totes les mines
function mostrarResposta() {
    const container = document.getElementById('grid-container');
    container.innerHTML = "";
    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');
            if (resposta[i][j] === '*') {
                div.classList.add('mina');
            } else {
                if (resposta[i][j]!=='') {
                    div.classList.add('active2');
                    div.innerText = resposta[i][j];

                }
            }
            container.appendChild(div);
        }
    }
}

