/*===============================IMPORT MODULES===============================*/
const app = require('./config/server'); /*Modulo responsável por fazer todas as configurações do servidor.*/
/*============================================================================*/

const port = process.env.PORT_SERVER; /*Recuperando a porta onde o servidor irá ouvir*/

/*==================================SERVER ON=================================*/

/*Instanciando o servidor, ouvindo na porta 3000.*/
app.listen(port, function () {
	console.log('plataforma-ml Server ON!');
});
/*============================================================================*/

