const { ipcRenderer } = require('electron');
const timer = require('./timer.js');
const data = require('../../data');

let linkSobre = document.getElementById('link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let tempo = document.querySelector('.tempo');
let play = false;
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = ()=>{
    data.pegaDados(curso.textContent)
        .then(dados=>tempo.textContent = dados.tempo);
}

linkSobre.addEventListener('click' , ()=>{
    ipcRenderer.send('abrir-janela-sobre');
});

botaoPlay.addEventListener('click', ()=>{
    if(play){
        timer.parar(curso.textContent);
        play = false;
        new Notification('Alura Timer',{
            body: `O curso ${curso.textContent} foi parado!!`,
            icon: 'img/stop-button.png'
        });
    }else{
        timer.iniciar(tempo);
        play = true;
        new Notification('Alura Timer',{
            body: `O curso ${curso.textContent} foi iniciado!!`,
            icon: 'img/play-button.png'
        });
    }
    imgs = imgs.reverse();
    botaoPlay.src = imgs[0];
});

ipcRenderer.on('curso-trocado', (event,nomeCurso) => {
    timer.parar(curso.textContent);
    data.pegaDados(nomeCurso)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        }).catch((err) => {
            console.log('O curso ainda não possui um JSON');
            tempo.textContent = "00:00:00";
        })
    curso.textContent = nomeCurso;
});

botaoAdicionar.addEventListener('click', ()=>{

    if(!campoAdicionar.value) return;

    let novoCurso = campoAdicionar.value;
    curso.textContent = novoCurso;
    tempo.textContent = '00:00:00';
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado', novoCurso);
});

ipcRenderer.on('atalho-iniciar-parar', () => {
    let click = new MouseEvent('click');
    botaoPlay.dispatchEvent(click);
});