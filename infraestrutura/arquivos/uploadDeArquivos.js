const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if (!tipoEhValido) {
        const erro = 'Tipo é inválido';
        console.log('Erro! Tipo inválido')
        callbackImagemCriada(erro)
    } else {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(false, novoCaminho))
    }
};


// Síncrono
// fs.readFile('./assets/konosuba.gif', (erro, buffer) => {
//     console.log('imagem foi bufferizada');
//     console.log(buffer);

//     fs.writeFile('./assets/copia.gif', buffer, erro => {
//         console.log('imagem copiada');
//     })
// });

//Assíncrono
// fs.createReadStream('./assets/konosuba.gif')
//     .pipe(fs.createWriteStream('./assets/copia.gif'))
//     .on('finish', () => {
//         console.log('imagem foi escrita de forma assíncrona com sucesso')
//     });

