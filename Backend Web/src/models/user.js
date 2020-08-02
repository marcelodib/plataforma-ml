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
 * |Model signIn responsável por enviar uma query para            |
 * |a base de dados, buscando um determinado usuário.             |
 * ================================================================
 */
model.prototype.selectUser = function (userInfo, callback) {
    return this._connection.select().from("user").where("userEmail", userInfo.userEmail);
}
/*============================================================================*/

/*==================================SIGN UP===================================*/
/**
 * ================================================================
 * |Model signUp responsável por enviar uma query para            |
 * |a base de dados, inserindo um novo usuário.                   |
 * ================================================================
 */
model.prototype.insertUser = function (user) { 
    return this._connection("user").insert([user]);
}
/*============================================================================*/

module.exports = function () {
	return model;
};
/*============================================================================*/

