const { Client } = require('pg');

// Configuração de conexão com o banco de dados
const config = {
  user: 'postgres',
  password: '123456',  
  host: 'localhost',
  port: 5432,
  database: 'crud_filmes'  // Nome do banco de dados
};

// Criar uma instância de cliente
const cliente = new Client(config);

module.exports = config;
