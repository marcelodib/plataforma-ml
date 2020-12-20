/*===============================IMPORT MODULES===============================*/
const knex = require("knex"); /*Módulo reponsável por realizar a conexão com a base de dados MySQL.*/
/*============================================================================*/

/*=============================DATABASE CONNECTION============================*/
/*Variável que conterá a instância de conexão com a base de dados.*/
let connection = null;

/*Preencher com os dados de conexão do banco de dados.*/
const info = {
  client: "mysql2",
  connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  }
};

/*Abrertura de conexão com a base de dados.*/
const getConnection = function () {
  if(connection !== null) {
      return connection;
  } else {
      connection = knex(info);
      return connection;
  }
};

module.exports = function () {
  return getConnection;
};
/*============================================================================*/