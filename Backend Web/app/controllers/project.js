/*===============================IMPORT MODULES===============================*/
const empty = require('is-empty');          /*Modulo responsável por fazer a verificação dos dados retornados pelo banco.*/
const {errorLog} = require("../utils/log"); /*Modulo responsável por gerar log de eventos de erro.*/
const {mkdirProject} = require("../utils/shell"); /*Modulo responsável por gerar log de eventos de erro.*/
const {createConfig, createPbtxt} = require("../utils/configProject"); /*Modulo responsável por gerar log de eventos de erro.*/
/*============================================================================*/

/*============================PROJECT CONTROLLERS=============================*/

/*===============================CREATE PROJECT===============================*/
/**
 * ================================================================
 * |Controller createProject responsável por verificar se existe  |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é realizado a inserção   |
 * |do novo projeto na base de dados.                             |
 * ================================================================
 */
module.exports.createProject = function (app, req, res) {
    /*Atribuição da função isValid para validação do token.*/
    const isValid = app.app.controllers.sign.isValid;
    /*Verificação se o usuário possui permissão para acessar essa rota.*/
    if (req.session.token != undefined && 
        isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {      
        /*Atribuição dos dados enviados no corpo da requisição.*/
        const project = req.body;

        /*Chamada da função que torna o objeto user imutável.*/
        Object.freeze(project);
        
        /*Abertura de conexão com o banco de dados.*/
        const connection = app.config.dbConnection();
        const model = new app.app.models.project(connection);

        /*Chamada do model que executa a query de inserção de um novo projeto na base de dados.*/
        model.createProject(project, app, req, res, function (error, result) {

            /*Verificação de erro no retorno do banco de dados.*/
            if (error) {
                errorLog(req.session.userEmail, "createProject", "createProject", "Erro ao acessar a base de dados para inserir novo projeto.", error);
                res.send({  
                    status: "error",
                    msg   : "Erro ao acessar a base de dados para inserir novo projeto!",
                    data  : error
                });
                return;
            }
            /*Verificação se o retorno do banco de dados está vazio.*/
            else if (empty(result) || result.affectedRows == 0) {
                errorLog(req.session.userEmail, "createProject", "createProject", "Projeto não foi inserido.", result);
                res.send({
                    status: "none",
                    msg   : "Projeto não foi criado!"
                });
                return;
            } else {
                const idProjet = result.insertId;
                
                mkdirProject(req.session.userEmail, idProjet);
                createConfig(req.session.userEmail, idProjet);
                createPbtxt(req.session.userEmail, idProjet, project.className);
                
                /*Envio da respostas*/
                res.send({
                    status: "success",
                    msg   : "Novo projeto criado com sucesso!"
                });
                return;
            }
        });
    } 
    else {
        /*Envio da respostas.*/
        res.send({status: "error", msg: "Acesso Negado!"});
        return;
    }
}
/*============================================================================*/

/*================================LIST PROJECT================================*/
/**
 * ================================================================
 * |Controller listProject responsável por verificar se existe    |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é verificado os dados    |
 * |enviados e realizado a busca pelos projetos requisitadas.     |
 * ================================================================
 */
module.exports.listProject = function (app, req, res) {

    /*Atribuição da função isValid para validação do token.*/
    const isValid = app.app.controllers.sign.isValid;
    /*Verificação se o usuário possui permissão para acessar essa rota.*/
    if (req.session.token != undefined && 
        isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {      
        
        const idProject = req.body.idProject;

        /*Chamada da função que torna o objeto user imutável.*/
        Object.freeze(idProject);

		/*Abertura de conexão com o banco de dados*/
		const connection = app.config.dbConnection();
		const model = new app.app.models.project(connection);

		/*Chamada da função que executa a query de busca de projetos na base de dados*/
		model.listProject(idProject, app, req, res, function (error, result) {

			/*Verificação de erro no retorno do banco de dados*/
			if (error) {
                errorLog(req.session.userEmail, "listProject", "listProject", "Erro ao acessar a base de dados para buscar projetos.", error);
				res.send({
                    status: "error",
                    msg: "Erro ao acessar a base de dados para buscar projetos!",
                    data: error
                });
				return;
			}
			/*Verificação se o retorno do banco de dados está vazio*/
			else if (empty(result)) {
                errorLog(req.session.userEmail, "listProject", "listProject", "Nenhum projeto foi encontrado.", result);
				res.send({  
                    status: "none",
                    msg: "Nenhum projeto foi encontrado!"
                });
				return;
			} else {
				/*Envio da respostas*/
				res.send({  
                    status: "success",
                    msg: "Projetos encontradas com sucesso!",
                    data: result
                });
				return;
			}
		});
	} else {
		/*Envio da respostas*/
		res.send({status: "error", msg: "Acesso Negado!"});
		return;
	}
}
/*============================================================================*/

/*===============================DELETE PROJECT===============================*/
/**
 * ================================================================
 * |Controller deleteProject responsável por verificar se existe  |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é verificado os dados    |
 * |enviados e realizado a remoção do projeto requisitado.        |
 * ================================================================
 */
module.exports.deleteProject = function (app, req, res) {

    /*Atribuição da função isValid para validação do token.*/
    const isValid = app.app.controllers.sign.isValid;
    /*Verificação se o usuário possui permissão para acessar essa rota.*/
    if (req.session.token != undefined && 
        isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {      
        
        const idProject = req.body.idProject;

        /*Chamada da função que torna o objeto user imutável.*/
        Object.freeze(project);

		/*Abertura de conexão com o banco de dados*/
		const connection = app.config.dbConnection();
		const model = new app.app.models.project(connection);

		/*Chamada da função que executa a query de remoção do projeto requisitado na base de dados*/
		model.deleteProject(idProject, app, req, res, function (error, result) {

			/*Verificação de erro no retorno do banco de dados*/
			if (error) {
                errorLog(req.session.userEmail, "deleteProject", "deleteProject", "Erro ao acessar a base de dados para remover projeto.", error);
				res.send({
                    status: "error",
                    msg: "Erro ao acessar a base de dados para remover projeto!",
                    data: error
                });
				return;
			}
			/*Verificação se o retorno do banco de dados está vazio*/
			else if (empty(result) || result.affectedRows == 0) {
                errorLog(req.session.userEmail, "deleteProject", "deleteProject", "Nenhum projeto foi removido.", result);
				res.send({
                    status: "none",
                    msg: "Nenhum projeto foi removido!"
                });
				return;
			} else {
				/*Envio da respostas*/
				res.send({
                    status: "success",
                    msg: "Projeto removido com sucesso!",
                    data: result
                });
				return;
			}
		});
	} else {
		/*Envio da respostas*/
		res.send({status: "error", msg: "Acesso Negado!"});
		return;
	}
}
/*============================================================================*/

/*============================UPDATE STATUS PROJECT===========================*/
/**
 * ================================================================
 * |Controller updateStatusProject responsável por realizar a     |
 * |atualização do status do projeto requisitado.                 |
 * ================================================================
 */
module.exports.updateStatusProject = function (project, app, req) {

    /*Chamada da função que torna o objeto user imutável.*/
    Object.freeze(project);

    /*Abertura de conexão com o banco de dados*/
    const connection = app.config.dbConnection();
    const model = new app.app.models.project(connection);
    
    return new Promise((resolve,reject) => {
        /*Chamada da função que executa a query de remoção do projeto requisitado na base de dados*/
        model.updateStatusProject(project, function (error, result) {

            /*Verificação de erro no retorno do banco de dados*/
            if (error) {
                errorLog(req.session.userEmail, "updateStatusProject", "updateStatusProject", "Erro ao acessar a base de dados para atualizar status do projeto.", error);
                resolve(false);
            }
            /*Verificação se o retorno do banco de dados está vazio*/
            else if (empty(result) || result.affectedRows == 0) {
                errorLog(req.session.userEmail, "updateStatusProject", "updateStatusProject", "Nenhum projeto foi atualizado.", result);
                resolve(false);
            } else {
                /*Envio da respostas*/
                resolve(true);
            }
        });
    });
}
/*============================================================================*/

/*============================================================================*/

