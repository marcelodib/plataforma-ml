/*===============================IMPORT MODULES===============================*/
const mysql = require('mysql'); /*Módulo reponsável por realizar a conexão com a base de dados MySQL.*/
/*============================================================================*/

let conn_singleton = null; /*Variável que conterá a instância de conexão com a base de dados.*/

/*=============================DATABASE CONNECTION============================*/

/*Preencher com os dados de conexão do banco de dados.*/
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

/*Abrertura de conexão com a base de dados.*/
let connMySQL = function () {
  if (conn_singleton !== null) {
    return conn_singleton;
  } else {
    conn_singleton = mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    });
    return conn_singleton;
  }
};

module.exports = function () {
  return connMySQL;
};
/*============================================================================*/
