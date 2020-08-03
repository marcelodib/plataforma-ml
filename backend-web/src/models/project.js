/*==============================PROJECT MODELS================================*/

/*==============================INSERT PROJECT================================*/
/**
 * ================================================================
 * |Model insertProject responsável por enviar uma query para     |
 * |a base de dados, inserindo um novo projeto.                   |
 * ================================================================
 */
model.prototype.insertProject = function (project) {
    return this._connection("project").insert([project]);
}
/*============================================================================*/

/*================================LIST PROJECT================================*/
/**
 * ================================================================
 * |Model listProject responsável por enviar uma query para       |
 * |a base de dados, buscando os dados dos projetos requisitados. |
 * ================================================================
 */
model.prototype.selectProject = function (idProject, idUser) {
    if (Array.isArray(idProject) && idProject.length > 0) {
        return this._connection.select().from({p: "project", s: "status"}).whereRaw(`p.idProject = ${idProject}`).whereRaw(`p.idUser = ${idUser}`).whereRaw("p.idStatus = s.idStatus");
    } else {
        return this._connection.select().from({p: "project", s: "status"}).whereRaw(`p.idUser = ${idUser}`).whereRaw("p.idStatus = s.idStatus");
    }
}
/*============================================================================*/

/*==============================DELETE PROJECT================================*/
/**
 * ================================================================
 * |Model deleteProject responsável por enviar uma query para     |
 * |a base de dados, removendo o projeto requisitado.             |
 * ================================================================
 */
model.prototype.deleteProject = function (idProject, idUser) {
    return this._connection("project").where("idProject", idProject).andWhere("idUser", idUser).del();
}
/*============================================================================*/

/*===========================UPDATE STATUS PROJECT============================*/
/**
 * =================================================================
 * |Model updateStatusProject responsável por enviar uma query para|
 * |a base de dados, atualizando o status do projeto requisitado.  |
 * =================================================================
 */
model.prototype.updateStatusProject = function (idProject, idUser) {
    return this._connection("project").increment("idStatus", 1).where("idProject", idProject).andWhere("idUser", idUser);
}
/*============================================================================*/

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

module.exports = function () {
	return model;
};
/*============================================================================*/