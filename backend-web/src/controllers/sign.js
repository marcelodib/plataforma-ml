/*===============================IMPORT MODULES===============================*/
const bcrypt      = require('bcryptjs');       /*Modulo responsável por gerar o hash da senha do usuário.*/
/*============================================================================*/

/*==============================SIGN CONTROLLERS==============================*/

/*=================================SIGN IN===================================*/
/**
 * ==================================================================
 * |Controller signIn responsável por verificar os dados enviados,  |
 * |e buscar na base de dados o usuário correspondente. Caso exista |
 * |é calculado o Hash da senha e comparado com a registrada,       |
 * |estando tudo de correto, a sessão é aberta.                     |
 * ==================================================================
 */
module.exports.signIn = async function (app, req, res) {
	try {
		/*Atribuição dos dados enviados na requisição.*/
		const userInfo = req.body;

		const user = await app.src.services.user.selectUser(app, userInfo);

		/*Verificação se o hash da senha enviada confere com a registrada*/
		if (user.length > 0 && bcrypt.compareSync(userInfo.userPassword, user[0].userPassword)) {

			/*Cria a session do usuario*/
			req.session.idUser    = user[0].idUser;
			req.session.userName  = user[0].userName
			req.session.userEmail = user[0].userEmail;
			req.session.userPhone = user[0].userPhone;

			/*Chamada da função que torna o objeto user imutável.*/
			Object.freeze(req.session);

			/*Envio da respostas*/
			return res.status(200).send({status: "success", msg: "Bem Vindo!"});
		} 
		/*Usuario não encontrado*/
		else {
			/*Envio da respostas*/
			return res.status(400).send({status: "error", msg: "Verifique os dados de login!"});
		}
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "signIn");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao autenticar o usuário!"});
	}
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
module.exports.signUp = async function (app, req, res) {
	try {
		/*Atribuição dos dados enviados no corpo da requisição.*/
		const user = req.body;
		
		/*Chamada da função que realiza o calculo do Hash.*/
		user.userPassword = bcrypt.hashSync(user.userPassword, 11);

		await app.src.services.user.insertUser(app, user);

		app.src.utils.shell.mkdirUser(user.userEmail);
		/*Envio da respostas*/
		return res.status(200).send({status: "success", msg: "Usuário inserido com sucesso!"});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "signUp");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao cadastrar novo usuário!"});
	}
}
/*============================================================================*/

/*============================================================================*/

