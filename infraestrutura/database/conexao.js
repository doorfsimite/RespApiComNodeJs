const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql123',
    port: '3306',
    database: 'agendaPetshop'
});

module.exports = conexao;