const moment = require('moment');
const axios = require('axios')
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimentos');

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
        if (existemErros) {
            return new Promise((resolve, reject) => reject(errors));
        } else {
            const atendimentoDatado = { ...atendimento, data, dataCriacao };
            return repositorio.adiciona(atendimentoDatado).then((resultados) => {
                const id = resultados.insertId
                return ({ ...atendimento, id })
            });
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';
        conexao.query(sql, (err, resultados) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(200).json(resultados);
            }
        })
    }
    getById(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
        conexao.query(sql, (err, resultados) => {
            if (err) {
                res.status(400).json(err);
            }
            if (typeof resultados[0] === 'undefined') {
                res.status(400).send('Argumentos inválidos');
            }
            else {
                const atendimento = resultados[0]
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
        conexao.query(sql, [valores, id], (err, resultados) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'
        conexao.query(sql, id, (err, resultados) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(resultados);
            }
        })
    }
}
module.exports = new Atendimento;