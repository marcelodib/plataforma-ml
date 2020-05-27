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

/*==================================SIGN IN===================================*/
/**
 * ================================================================
 * |Model signIn responsável por autenticar o usuário, verificando|
 * |usuário existe na base, e retornando seus dados para abertura |
 * |da sessão.                                                    |
 * ================================================================
 */
model.prototype.signIn = function (userInfo, callback) {
    /*Chamada da função que executa a query de busca de dados do usuário requisitado na base de dados.*/
    this._connection.query('SELECT * FROM user WHERE user.userEmail = \'' + userInfo.userEmail + '\'', callback);
}
/*============================================================================*/

/*==================================SIGN UP===================================*/
/**
 * ================================================================
 * |Model signUp responsável por verificar se existe sessão aberta|
 * |para acessar esse model.                                      |
 * |Caso as condições sejam verdadeiras, é enviado uma query para |
 * |a base de dados, inserindo um novo usuário.                   |
 * ================================================================
 */
model.prototype.signUp = function (user, callback) { 
    /*Chamada da função que executa a query de inserção de um novo usuário na base de dados.*/
    this._connection.query('INSERT INTO user (userName, UserEmail, userPassword, userPhone) VALUES (' +
        '\'' + user.userName     + '\', ' +
        '\'' + user.userEmail    + '\', ' +
        '\'' + user.userPassword + '\', ' +
        '\'' + user.userPhone    + '\')', callback);
}
/*============================================================================*/

module.exports = function () {
	return model;
};
/*============================================================================*/

