/*===============================IMPORT MODULES===============================*/
const express = require('express');                             /*Módulo responsável por criar as configurações básicas de um web server.*/
const consign = require('consign');                             /*Módulo responsável por fazer o encurtamento de caminhos da aplicação.*/
const morgan = require('morgan');                               /*Módulo responsável por fazer o monitoramento de acesso as rotas.*/
const bodyParser = require('body-parser');                      /*Módulo responsável por fazer a conversão de dados que chegam nas rotas.*/
const expressSession = require('express-session');              /*Módulo responsável por criar sessões de acesso.*/
const SQLiteStore = require('connect-sqlite3')(expressSession); /*Módulo responsável por salvar as sessões em arquivo.*/
const dotenv = require('dotenv');                               /*Modulo responsável por fazer a leitura das variáveis de ambiente.*/
/*============================================================================*/

/*===============================SERVER CONFIG================================*/
/*Chamada da função que realiza a leitura das variáveis de ambiente.*/
dotenv.config();

/*Chamada da função que inicializa o módulo express na variável app.*/
let app = express();

/*Chamada da função que inicializa a engine de visualização com o módulo ejs.*/
app.set('view engine', 'ejs');

/*chamada da função que atribui as views da aplicação ao path ./app/views .*/
app.set('views', './app/views');

/*Chamada da função que configura a criação de sessões de acesso e
	as salva em um arquivo local, utilizando o módulo SQLite.*/
app.use(expressSession({
	store: new SQLiteStore,
	secret: '&b3Kjd96*7y',
	cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, /*1 Semana*/
	resave: true,
	saveUninitialized: true
}));

/*Chamada da função que atribui o diretório static ao path ./app/public .*/
app.use(express.static('./app/public'));

/*Chamada da função que configura a chegada de dados como application/x-www-form-urlencoded.*/
app.use(bodyParser.urlencoded({limit: '100mb', extended: false }));

/*Chamada da função que configura a chegada de dados como application/json.*/
app.use(bodyParser.json({limit: '100mb'}));

/*Chamada da função que gera o log de monitoramento das rotas.*/
app.use(morgan('dev'));

/*Chamada da função que configura o header padrão de resposta.*/
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

/*Chamada da função que inclui na aplicação todos os paths dos módulos a serem acessados.*/
consign()
	.include('src/routes')          /*Inclusão das rotas.*/
	.then('src/controllers')        /*Inclusão dos controllers.*/
	.then('src/services')        /*Inclusão dos controllers.*/
	.then('src/models')             /*Inclusão dos models.*/
	.then('src/utils')             /*Inclusão dos models.*/
	.then('config/database.js') /*Inclusão da conexão com a base de dados.*/
    .into(app);
    
module.exports = app;
/*============================================================================*/
