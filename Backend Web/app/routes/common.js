/*===============================IMPORT MODULES===============================*/
/*============================================================================*/

/*===============================COMMON ROUTES================================*/
module.exports = function (app) {
/*=================================HOME PAGE==================================*/
    /** 
     * =======================================================================
     * |Route / responsável por verificar se o usuário possuí sessão aberta. |
     * |Caso as condições sejam verdadeiras, retorna a pagina de home do     |
     * |usuários, caso contrário, retorna a pagina de index.                 |
     * =======================================================================
    */
    app.get('/', function (req, res) {
        /*Atribuição da função isValid para validação do token.*/
        const isValid = app.app.controllers.sign.isValid;
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.token != undefined && 
            isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
            /*Renderiza tela de home do usúario.*/
            res.render("./common/home");
            return;
        }
        else{
            /*Renderiza tela de index do sistema.*/
            res.render("./common/index");
            return;
        }
    });
/*============================================================================*/

}
/*============================================================================*/