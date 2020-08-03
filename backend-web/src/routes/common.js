/*===============================IMPORT MODULES===============================*/
/*============================================================================*/

/*===============================COMMON ROUTES================================*/
module.exports = function (app) {
/*=================================HOME PAGE==================================*/
    /** 
     * =======================================================================
     * |Route / responsável por verificar se o usuário possuí sessão aberta. |
     * |Caso as condições sejam verdadeiras, retorna a pagina de home do     |
     * |usuário, caso contrário, retorna a pagina de index.                  |
     * =======================================================================
    */
    app.get('/', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Renderiza tela de home do usúario.*/
            return res.render("./common/home");
        }
        else{
            /*Renderiza tela de index do sistema.*/
            return res.render("./common/index");
        }
    });
/*============================================================================*/

}
/*============================================================================*/