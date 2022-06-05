const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {
    templateInicial: null,
    geraTrayTemplate(win){
        let template = [
            {label: 'Cursos'},
            {type: 'separator'},
            ...data.pegaNomeDosCursos()
                .map(curso=>{
                    return {
                        label: curso,
                        type: 'radio',
                        click: ()=>win.send('curso-trocado', curso)
                    }
                })
        ];

        this.templateInicial = template;
        return template;
    },
    adicionaCursoNoTray(curso, win){
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: ()=>win.send('curso-trocado', curso)
        });

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate(app){
        let templateMenu = [
            {
                label: 'Visão',
                submenu: [
                    {
                        label: 'Recarregar',
                        role: 'reload'
                    },
                    {
                        label: 'Abrir/fechar devtools',
                        role: 'toggledevtools'
                    }
                ]
            },
            {
                label: 'Janela',
                submenu: [
                    {
                        label: 'Minimizar',
                        role: 'minimize',
                        accelerator: 'Shift+M'
                    },
                    {
                        label: 'Fechar',
                        role: 'close'
                    }
                ]
            },
            { 
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o Alura Timer',
                        click: ()=>{
                            ipcMain.emit('abrir-janela-sobre');
                        },
                        accelerator: 'CommandOrControl+I'
                    }
                ]
            }
        ];
        
        if(process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    { label: 'Estou rodando no Mac!' }
                ]
            });
        }

        return templateMenu;
    }
}