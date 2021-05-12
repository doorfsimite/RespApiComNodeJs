class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendiments();
        this.criarPets();
    }

    criarAtendiments() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dateCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
        this.conexao.query(sql, (error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Tabela Atendimentos criada com sucesso');
            }
        }))
    }

    criarPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome VARCHAR(50), imagem VARCHAR(200), PRIMARY KEY (id))';
        this.conexao.query(sql, (erro) => {
            if (erro) { console.log(erro) }
            else { console.log('Tabela Pets foi criada com sucesso') }
        })

    }

}
module.exports = new Tabelas;