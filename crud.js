const { Client } = require('pg');
const config = require('./bd'); // Importa a configuração de banco de dados

// Função para inserir um filme
async function inserir(filme) {
  const cliente = new Client(config);
  await cliente.connect();

  const sql = `INSERT INTO filmes (titulo, genero, ano)
               VALUES ($1, $2, $3) RETURNING *`;
  const valores = [filme.titulo, filme.genero, filme.ano];

  const res = await cliente.query(sql, valores);
  await cliente.end();

  return res.rows[0];
}

// Função para listar todos os filmes
async function listarFilmes() {
  const cliente = new Client(config);
  await cliente.connect();

  const sql = `
    SELECT id, titulo, genero, ano
    FROM filmes
    ORDER BY id;
  `;
  
  const res = await cliente.query(sql);
  await cliente.end();

  return res.rows;
}

// Função para buscar um filme por ID
async function buscarPorId(id) {
  const cliente = new Client(config);
  await cliente.connect();

  const sql = `
    SELECT id, titulo, genero, ano
    FROM filmes
    WHERE id = $1;
  `;
  const valores = [id];

  const result = await cliente.query(sql, valores);
  await cliente.end();

  return result.rows[0];
}

// Função para atualizar um filme
async function atualizar(id, filme) {
  const cliente = new Client(config);
  await cliente.connect();

  const sql = `
    UPDATE filmes
    SET titulo = $1, genero = $2, ano = $3
    WHERE id = $4
    RETURNING *;
  `;
  const valores = [filme.titulo, filme.genero, filme.ano, id];

  const result = await cliente.query(sql, valores);
  await cliente.end();

  return result.rows[0];
}

// Função para deletar um filme
async function deletar(id) {
  const cliente = new Client(config);
  await cliente.connect();

  const sql = "DELETE FROM filmes WHERE id = $1 RETURNING *";
  const valores = [id];

  const result = await cliente.query(sql, valores);
  await cliente.end();

  return result.rows[0];
}

// Exportar as funções
module.exports = {
  inserir,
  listarFilmes,
  buscarPorId,
  atualizar,
  deletar
};