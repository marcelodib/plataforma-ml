/*===============================IMPORT MODULES===============================*/
const dotenv = require('dotenv'); /*Modulo responsável por fazer a leitura das variáveis de ambiente.*/
/*============================================================================*/

/*==================================READ ENV==================================*/

/*Chamada da função que realiza a leitura das variáveis de ambiente.*/
const result = dotenv.config();

/*Verificação de ocorrência de erro na leitura.*/
if (result.error) {
  throw result.error;
}

/*Atribuição da variáveis lidas à aplicação.*/
const { parsed: envs } = result;

module.exports = envs;
/*============================================================================*/
