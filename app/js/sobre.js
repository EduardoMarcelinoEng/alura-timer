const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkPortfolio = document.querySelector("#link-portfolio");
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function(){
    versaoElectron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', ()=>{
    ipcRenderer.send('fechar-janela-sobre');
})

linkPortfolio.addEventListener('click', ()=>{
    shell.openExternal("https://portfolio-eduardomarcelino.herokuapp.com/meus-projetos");
})
