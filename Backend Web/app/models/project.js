/*===============================FUNCTION MODEL===============================*/
/**
 * ================================================================
 * |Função responsável por receber a conexão com a base de dados  |
 * |e guarda-la como uma varivável local, para acesso dos models. |
 * ================================================================
 */
function model(connection) {
	this._connection = connection;
}
/*============================================================================*/

/*===================================MODELS===================================*/

/*==============================CREATE PROJECT================================*/
/**
 * ================================================================
 * |Model createProject responsável por verificar se existe sessão|
 * |aberta para acessar esse model.                               |
 * |Caso as condições sejam verdadeiras, é enviado uma query para |
 * |a base de dados, inserindo um novo projeto.                   |
 * ================================================================
 */
model.prototype.createProject = function (project, app, req, res, callback) {

    /*Atribuição da função isValid para validação do token.*/
    const isValid = app.app.controllers.sign.isValid;
    /*Verificação se o usuário possui permissão para acessar essa rota.*/
    if (req.session.token != undefined && 
        isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {      
        
        /*Chamada da função que executa a query de inserção de um novo usuário na base de dados.*/
        this._connection.query('INSERT INTO project (projectName, className, idUser) VALUES (' +
                '\'' + project.projectName + '\', ' +
                '\'' + project.className   + '\', ' +
                req.session.idUser + ')', callback);
    } else {
        /*Envio da respostas.*/
        res.send({status: "error", msg: "Acesso Negado!"});
        return;
    }
}
/*============================================================================*/

/*================================LIST PROJECT================================*/
/**
 * ================================================================
 * |Model listProject responsável por verificar se existe sessão  |
 * |aberta para acessar esse model.                               |
 * |Caso as condições sejam verdadeiras, é enviado uma query para |
 * |a base de dados, buscando os dados dos projetos requisitados. |
 * ================================================================
 */
model.prototype.listProject = function (idProject, app, req, res, callback) {

    /*Atribuição da função isValid para validação do token.*/
    const isValid = app.app.controllers.sign.isValid;
    /*Verificação se o usuário possui permissão para acessar essa rota.*/
    if (req.session.token != undefined && 
        isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {      
        /*Variável que conterá a query a ser executada no banco de dados.*/
        let query = "";
        /*Verificação se foi requisitado todos os projetos do usuário.*/
        if(idProject == 0) {
            query = 'SELECT * FROM project, status WHERE project.idStatus = status.idStatus AND project.idUser = ' + req.session.idUser;
        /*Verificação se foi requisitado um projeto específico do usuário.*/
        } else if (idProject > 0){
            query = 'SELECT * FROM project, status WHERE project.idStatus = status.idStatus AND project.idProject = ' + idProject + ' AND project.idUser = ' + req.session.idUser;
        } else {
            /*Envio da respostas.*/
            res.send({status: "error", msg: "Parâmetros inválidos!"});
            return;
        }
        /*Chamada da função que executa a query de busca de dados dos projetos requisitados na base de dados.*/
        this._connection.query(query, callback);
    } else {
        /*Envio da respostas.*/
        res.send({status: "error", msg: "Acesso Negado!"});
        return;
    }
}
/*============================================================================*/

/*==============================DELETE PROJECT================================*/
/**
 * ================================================================
 * |Model deleteProject responsável por verificar se existe sessão|
 * |aberta para acessar esse model.                               |
 * |Caso as condições sejam verdadeiras, é enviado uma query para |
 * |a base de dados, removendo o projeto requisitado.             |
 * ================================================================
 */
model.prototype.deleteProject = function (idProject, app, req, res, callback) {

    /*Atribuição da função isValid para validação do token.*/
    const isValid = app.app.controllers.sign.isValid;
    /*Verificação se o usuário possui permissão para acessar essa rota.*/
    if (req.session.token != undefined && 
        isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {      
        
        /*Chamada da função que executa a query de remoção de um determinado projeto na base de dados.*/
        this._connection.query('DELETE FROM project WHERE project.idProject = ' + idProject + " AND idUser = " + req.session.idUser, callback);
    } else {
        /*Envio da respostas.*/
        res.send({status: "error", msg: "Acesso Negado!"});
        return;
    }
}
/*============================================================================*/

/*===========================UPDATE STATUS PROJECT============================*/
/**
 * =================================================================
 * |Model updateStatusProject responsável por enviar uma query para|
 * |a base de dados, atualizando o status do projeto requisitado.  |
 * =================================================================
 */
model.prototype.updateStatusProject = function (project, callback) {
    /*Chamada da função que executa a query de atualização de status do projeto na base de dados.*/
    this._connection.query('UPDATE project SET idStatus = ' + (project.idStatus + 1) + ' WHERE idProject = ' + project.idProject, callback);
}
/*============================================================================*/

module.exports = function () {
	return model;
};
/*============================================================================*/