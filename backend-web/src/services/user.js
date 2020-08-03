/*===============================IMPORT MODULES===============================*/
/*============================================================================*/

/*===============================USER SERVICES================================*/

/*================================SELECT USER=================================*/
/**
 * ==================================================================
 * |Service signIn responsável por realizar a busca de usuários na  |
 * |base de dados.                                                  |
 * ==================================================================
 */
module.exports.selectUser = function (app, userEmail) {
	/*Abertura de conexão com o banco de dados*/
	const connection = app.config.database();
    const model = new app.src.models.user(connection);
    
    /*Chamada do model que executa a query de busca de usuários na base de dados.*/
    const result = await model.selectUser(userEmail) 

    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectUser", error: result};
    }
}
/*============================================================================*/

/*================================INSERT USER=================================*/
/**
 * ================================================================
 * |Service insertUser responsável por realizar a inserção do novo| 
 * |usuário na base de dados.                                     |
 * ================================================================
 */
module.exports.insertUser = function (app, user) {
    /*Abertura de conexão com o banco de dados*/
	const connection = app.config.database();
    const model = new app.src.models.user(connection);
    
    /*Chamada do model que executa a query de inserção de um novo usuário na base de dados.*/
    const result = await model.insertUser(user) 

    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertUser", error: result};
    }
}
/*============================================================================*/

/*============================================================================*/

