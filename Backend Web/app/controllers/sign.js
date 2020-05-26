/*===============================IMPORT MODULES===============================*/
const bcrypt = require('bcryptjs');         /*Modulo responsável por gerar o hash da senha do usuário.*/
const empty = require('is-empty');          /*Modulo responsável por fazer a verificação dos dados retornados pelo banco.*/
const token = require('token');             /*Modulo responsável por gerar o token do usuário.*/
const {errorLog} = require("../utils/log"); /*Modulo responsável por gerar log de eventos de erro.*/
/*============================================================================*/

/*================================CONFIG TOKEN================================*/
const tokenSecret = process.env.TOKEN_SECRET; /*Variável que contem o secret para geração do token.*/

token.defaults.secret = tokenSecret; /*Atribuição do secret ao módulo token.*/
token.defaults.timeStep = 60 * 60;   /*Atribuição da duração do token.*/
/*============================================================================*/

/*==============================SIGN CONTROLLERS==============================*/
/**
 * |=============================================================|
 * |Função responsável por fazer a validação do token da session |
 * |com o novo token gerado com os dados da session ativa.       |
 * |=============================================================|
 */
module.exports.isValid = function (a, b) {
	return token.verify(a, b);
}

/*=================================SIGN IN===================================*/
/**
 * ==================================================================
 * |Controller signIn responsável por verificar os dados enviados,  |
 * |e buscar na base de dados o usuário correspondente. Caso exista |
 * |é calculado o Hash da senha e comparado com a registrada,       |
 * |estando tudo de correto, a sessão é aberta.                     |
 * ==================================================================
 */
module.exports.signIn = function (app, req, res) {
    /*Atribuição dos dados enviados na requisição.*/
	const userInfo = req.body;
	
	/*Chamada da função que torna o objeto user imutável.*/
	Object.freeze(userInfo);

	/*Abertura de conexão com o banco de dados*/
	const connection = app.config.dbConnection();
	const model = new app.app.models.sign(connection);

	/*Chamada da função que executa a query de busca do usuario no banco de dados*/
	model.signIn(userInfo, function (error, result) {
	
		/*Verificação de erro no retorno do banco de dados*/
		if (error) {
			errorLog(userInfo.userEmail, "signIn", "signIn", "Erro ao acessar a base de dados para autenticar o usuário.", error);
            res.send({
				status: "error",
				msg: "Erro ao acessar a base de dados para autenticar o usuário!",
				data: error
			});
            return;
		} 
		/*Verificação se o retorno do banco de dados está vazio*/
		else if (empty(result)) {
			errorLog(userInfo.userEmail, "signIn", "signIn", "Nenhum usuário encontrado.", result);
            res.send({status: "none", msg: "Usuário não encontrado!"});
            return;
		} else {

			/*Verificação se o hash da senha enviada confere com a registrada*/
			if (bcrypt.compareSync(userInfo.userPassword, result[0].userPassword)) {

				/*Cria a session do usuario*/
				req.session.idUser    = result[0].idUser;
				req.session.userName  = result[0].userName
				req.session.userEmail = result[0].userEmail;
				req.session.userPhone = result[0].userPhone;
				req.session.token     = token.generate(req.session.userEmail + req.session.userName + req.session.idUser.toString());

				/*Chamada da função que torna o objeto user imutável.*/
				Object.freeze(req.session);

				/*Envio da respostas*/
				res.send({status: "success", msg: "Bem Vindo!"});
				return;
			} 
			/*Usuario não encontrado*/
			else {
				/*Envio da respostas*/
				res.send({status: "error", msg: "Verifique os dados de login!"});
				return;
			}
		}
	});
}
/*============================================================================*/

/*==================================SIGN UP===================================*/
/**
 * ================================================================
 * |Controller signUp responsável por calcular o Hash da         |
 * |senha enviada, e realizar a inserção do novo usuário na      |
 * |base de dados.                                               |
 * ================================================================
 */
module.exports.signUp = function (app, req, res) {

	/*Atribuição dos dados enviados no corpo da requisição.*/
	let user = req.body;
	
	/*Chamada da função que realiza o calculo do Hash.*/
	user.userPassword = bcrypt.hashSync(user.userPassword, 11);
	
	/*Chamada da função que torna o objeto user imutável.*/
	Object.freeze(user);

	/*Abertura de conexão com o banco de dados.*/
	const connection = app.config.dbConnection();
	const model = new app.app.models.sign(connection);

	/*Chamada do model que executa a query de inserção de novo usuario na base de dados.*/
	model.signUp(user, function (error, result) {

		/*Verificação de erro no retorno do banco de dados.*/
		if (error) {
			errorLog(user.userEmail, "signUp", "signUp", "Erro ao acessar a base de dados para inserir novo usuário.", error);
			res.send({
				status: "error",
				msg: "Erro ao acessar a base de dados para inserir novo usuario!",
				data: error
			});
			return;
		}
		/*Verificação se o retorno do banco de dados está vazio.*/
		else if (empty(result) || result.affectedRows == 0) {
			errorLog(user.userEmail, "signUp", "signUp", "Usuário não foi inserido.", result);
			res.send({status: "none", msg: "Usuário não foi inserido!"});
			return;
		} else {

			/*Envio da respostas*/
			res.send({status: "success", msg: "Usuário inserido com sucesso!"});
			return;
		}
	});
}
/*============================================================================*/

/*=================================SIGN OUT===================================*/
/**
 * ================================================================
 * |Controller signOut responsável por verificar se existe sessão |
 * |aberta. Caso a condição seja verdadeira, é encerrada a sessão |
 * |do usuário, caso contrário, é redirecinado diretamento para   |
 * |tela de login.                                                |
 * ================================================================
 */
module.exports.signOut = function (app, req, res) {
    
    /*Atribuição da função isValid para validação do token.*/
	const isValid = app.app.controllers.sign.isValid;

    /*Verifica se o usuário possui uma sessão aberta.*/
	if (req.session.token != undefined && 
		isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {

		/*Remoção da sessão.*/
		req.session.destroy(res.render('sign/signIn'));
		return;
	}
	else {
		res.render('sign/signIn');
		return;
	}
}
/*============================================================================*/

/*============================================================================*/

