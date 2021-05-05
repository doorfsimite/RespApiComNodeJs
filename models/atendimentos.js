const moment = require('moment');
const conexao = require('../infraestrutura/conexao');
class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.client.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                message: "Cliente deve ter ao menos 5 caracteres"
            }
        ]
        const errors = validacoes.filter(campo => !campo.valido);
        const existemErros = errors.length;
        if (existemErros) { res.status(400).json(errors) }
        else {
            const atendimentoDatado = { ...atendimento, data, dataCriacao };
            const sql = 'INSERT INTO Atendimentos SET ?'
            conexao.query(sql, atendimentoDatado, (error, resultados) => {
                if (error) {
                    console.log(error);
                    res.status(400).json(error)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';
        conexao.query(sql, (err, resultados) => {
            if(err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json(resultados);
            }
        })
    }
    getById(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
        conexao.query(sql, (err, resultados) => {
            if(err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json(resultados[0]);
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
        conexao.query(sql, [valores, id], (err, resultados) =>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    delete(id, res){
        const sql = 'DELE FROM Atendimentos WHERE id=?'
        conexao.query(sql, id, (err, resultados) =>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(resultados);
            }
        })
    }
}
module.exports = new Atendimento;