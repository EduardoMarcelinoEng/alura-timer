const jsonfile = require('jsonfile-promised');
const { existsSync, readdirSync } = require('fs');

module.exports = {
    salvaDados(curso, tempoEstudado){
        let arquivoDoCurso = `${__dirname}/data/${curso}.json`;
        if(existsSync(arquivoDoCurso)){
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
        } else{
            this.criaArquivoDeCurso(arquivoDoCurso, {})
                .then(()=>{
                    this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
                });
        }
    },
    adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado){
        jsonfile.writeFile(arquivoDoCurso, {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }, {spaces: 4})
            .then(()=>console.log("Tempo salvo com sucesso!"))
            .catch(err=>console.log(`Erro ao salvar tempo: ${err}`));
    },
    criaArquivoDeCurso(nomeArquivo, conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
            .then(()=>console.log('Arquivo criado!'))
            .catch(err=>console.log(`Erro ao criar arquivo: ${err}`));
    },
    pegaDados(curso){
        let arquivoDoCurso = `${__dirname}/data/${curso}.json`;

        return jsonfile.readFile(arquivoDoCurso)
    },
    pegaNomeDosCursos(){
        return readdirSync(__dirname + '/data').map(curso=>curso.replace('.json', ''));
    }
}