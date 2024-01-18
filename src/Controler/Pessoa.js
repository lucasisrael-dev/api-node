import {openDb} from '../configDB.js';

export async function createTable(){
  openDb().then(db =>{
    db.exec('CREATE TABLE IF NOT EXISTS Pessoa (id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER)');
  })
}

export async function selectPessoas(req, res){
  openDb()
    .then(db =>{
      db.all('SELECT * FROM Pessoa')
      .then(pessoas => res.json(pessoas))
    });
}

export async function selectPessoa(req, res){
  let idPessoa = req.body.id;
  openDb()
    .then(db =>{
      db.get('SELECT * FROM Pessoa WHERE id=?', [idPessoa])
      .then(pessoa => res.json(pessoa))
    });
}

export async function insertPessoa(req, res){
  let pessoa = req.body;
  openDb()
    .then(db =>{
      db.run('INSERT INTO Pessoa (nome, idade) VALUES (?,?)', [pessoa.nome, pessoa.idade]);
    });
    res.json({
      "statusCode": 200,
      "msg": "Usuario criado com sucesso"
    })
}

export async function updatePessoa(req, res){
  let pessoa = req.body;
  openDb()
    .then(db =>{
      db.run('UPDATE Pessoa SET nome=?, idade=? WHERE id=?', [pessoa.nome, pessoa.idade, pessoa.id]);
    });
    res.json({
      "statusCode": 200,
      "msg": "Usuario atualizado com sucesso"
    })
}


export async function deletePessoa(req, res){
  let idPessoa = req.body.id;
  openDb()
    .then(db =>{
      db.get('DELETE FROM Pessoa WHERE id=?', [idPessoa])
      .then(res => res)
    });
    res.json({
      "statusCode": 200,
      "msg": "Usuario deletado com sucesso"
    })
}