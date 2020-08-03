/*===============================IMPORT MODULES===============================*/
/*============================================================================*/

/*==============================PROJECT SERVICES==============================*/

/*===============================INSERT PROJECT===============================*/
/**
 * ================================================================
 * |Service insertProject responsável por realizar a inserção     |
 * |do novo projeto na base de dados.                             |
 * ================================================================
 */
module.exports.insertProject = async function (app, project) {
    /*Abertura de conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);

    /*Chamada do model que executa a query de inserção de um novo projeto na base de dados.*/
    const result = await model.insertProject(project) 

        /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertProject", error: result};
    }
}
/*============================================================================*/

/*================================SELECT PROJECT================================*/
/**
 * ================================================================
 * |Service selectProject responsável por realizar a busca pelos  |
 * |projetos requisitadas.                                        |
 * ================================================================
 */
module.exports.selectProject = async function (app, idProject, idUser) {
    /*Abertura de conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);

    /*Chamada do model que executa a query de busca de projetos na base de dados*/
    const result = await model.selectProject(idProject, idUser) 

        /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectProject", error: result};
    }
}
/*============================================================================*/

/*===============================DELETE PROJECT===============================*/
/**
 * ================================================================
 * |Service deleteProject responsável por realizar a remoção do   |
 * |projeto requisitado da base de dados.                         |
 * ================================================================
 */
module.exports.deleteProject = function (app, idProject, idUser) {
    /*Abertura de conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);

    /*Chamada do model que executa a query de remoção de projetos na base de dados*/
    const result = await model.deleteProject(idProject, idUser) 

        /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "deleteProject", error: result};
    }
}
/*============================================================================*/

/*============================UPDATE STATUS PROJECT===========================*/
/**
 * ================================================================
 * |Service updateStatusProject responsável por realizar a        |
 * |atualização do status do projeto requisitado na base de dados.|
 * ================================================================
 */
module.exports.updateStatusProject = function (app, idProject, idUser) {
    /*Abertura de conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);

    /*Chamada do model que executa a query de atualização de status de projetos na base de dados*/
    const result = await model.updateStatusProject(idProject, idUser) 

        /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "updateStatusProject", error: result};
    }
}
/*============================================================================*/

/*============================================================================*/

