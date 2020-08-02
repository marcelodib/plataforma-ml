/*===============================IMPORT MODULES===============================*/
const { check, validationResult } = require('express-validator'); /*Modulo responsável por fazer a validação dos dados que chegam nas requisições.*/
/*============================================================================*/

/*================================SIGN ROUTES=================================*/
module.exports = function (app) {

/*==================================SIGN IN===================================*/
    /** 
     * =======================================================================
     * |Route signIn responsável por verificar se o usuário possuí sessão    |
     * |aberta.                                                              |
     * |Caso as condições sejam verdadeiras, retorna a pagina de home do     |
     * |usuário, caso contrário, retorna a pagina de signIn.                 |
     * =======================================================================
    */
    app.get('/signIn', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Renderiza tela de home do usúario.*/
            return res.render("./common/home");
        }
        else{
            /*Renderiza tela de sign in do usúario.*/
            return res.render("./sign/signIn");
        }
    });

    /** 
     * ========================================================================
     * |Route signIn responsável por verificar se os dados enviados são       |
     * |validos, e realizar a autenticaçao na base de dados, para abrir a     |
     * |sessão do usuário.                                                    |
     * ========================================================================
    */
    app.post('/signIn', 
    [
        check('userEmail'   , 'Email inválido!').not().isEmpty().escape().isEmail().isLength({max: 127 }),
        check('userPassword', 'Senha inválida!').not().isEmpty().isLength({ min: 8, max: 32 })
    ], 
    function (req, res) {
        /*Chamada da função que valida os dados da requisição.*/
        const errors = validationResult(req)
        /*Verificação se os parâmetros não apresentam inconsistências.*/            
        if (!errors.isEmpty()) {
            /*Envio da respostas.*/
            return res.status(400).send({status: "error", msg: errors.array()});
        }
        else {
            /*Chamada do controller parar realizar a sign in do usuário e criação de sessão.*/
            return app.src.controllers.sign.signIn(app, req, res);
        }
    });
/*============================================================================*/

/*==================================SIGN UP===================================*/
    /** 
     * =======================================================================
     * |Route signUp responsável por verificar se o usuário possuí sessão    |
     * |aberta.                                                              |
     * |Caso as condições sejam verdadeiras, retorna a pagina de home do     |
     * |usuário, caso contrário, retorna a pagina de signUp.                 |
     * =======================================================================
    */
    app.get('/signUp', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Renderiza tela de home do usúario.*/
            return res.render("./common/home");
        }
        else{
            /*Renderiza tela de sign up do usúario.*/
            return res.render("./sign/signUp");
        }
    });

    /** 
     * =======================================================================
     * |Route signUp responsável por verificar se os dados enviados são      |
     * |validos, e realizar o cadastro do novo usuário, caso contrario,      |
     * |retorna o erro.                                                      |
     * =======================================================================
    */
    app.post('/signUp', 
    [
        check('userName'    , 'Nome inválido!' ).not().isEmpty().escape().isString().isLength({ max: 127 }),
        check('userEmail'   , 'Email inválido!').not().isEmpty().escape().isEmail().isLength({ max: 127 }),
        check('userPhone'   , 'Phone inválido!').not().isEmpty().escape().isString().isLength({ min: 13, max: 15 }), 
        check('userPassword', 'Senha inválida!').not().isEmpty().isLength({ min: 8, max: 31 })
    ], 
    function (req, res) {
        /*Chamada da função que valida os dados da requisição.*/
        const errors = validationResult(req)
        /*Verificação se os parâmetros não apresentam inconsistências.*/            
        if (!errors.isEmpty()) {
            /*Envio da respostas.*/
            return res.status(400).send({status: "error", msg: errors.array()});
        }
        else {
            /*Chamada do controller parar realizar a inserção do novo usuário.*/
            return app.src.controllers.sign.signUp(app, req, res);
        }
    });
/*============================================================================*/

/*=================================SIGN OUT===================================*/
    /** 
     * ========================================================================
     * |Route signOut responsável por fechar a sessão do usuário.             |
     * ========================================================================
    */
    app.get('/signOut', function (req, res) {
        /*Verifica se o usuário possui uma sessão aberta.*/
        if (req.session.token != undefined) {
            /*Remoção da sessão.*/
            return req.session.destroy(res.render('sign/signIn'));
        }
        else {
            return res.render('sign/signIn');
        }
    });
/*============================================================================*/

}
/*============================================================================*/
