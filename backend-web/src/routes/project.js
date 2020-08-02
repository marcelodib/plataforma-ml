/*===============================IMPORT MODULES===============================*/
const { check, validationResult } = require('express-validator'); /*Modulo responsável por fazer a validação dos dados que chegam nas requisições.*/
/*============================================================================*/

/*================================USER ROUTES=================================*/
module.exports = function (app) {

/*===============================CREATE PROJECT===============================*/
    /** 
     * =======================================================================
     * |Route createProject responsável por verificar se o usuário possuí    |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, retorna a pagina de criação de  |
     * |projeto, caso contrário, retorna a pagina de sign In.                |
     * =======================================================================
    */
    app.get('/createProject', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Renderiza tela de criação de projeto.*/
            return res.render("./project/createProject");
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            return res.redirect("/signIn");
        }
    });

    /** 
     * =======================================================================
     * |Route createProject responsável por verificar se o usuário possuí    |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados   |
     * |são validos, e realiza o cadastro do projeto, caso contrario,        |
     * |retorna o erro.                                                      |
     * =======================================================================
    */
    app.post('/createProject', 
    [
        check('projectName', 'Nome inválido!')  .not().isEmpty().escape().isString().isLength({ max: 127 }),
        check('className'  , 'Classe inválido!').not().isEmpty().escape().isString().isLength({ max: 63 }), 
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a inserção do novo projeto.*/
                return app.src.controllers.project.createProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*=================================LIST PROJECT===============================*/
    /** 
     * =======================================================================
     * |Route listProject responsável por verificar se o usuário possuí      |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, retorna a pagina de listagem de |
     * |projetos, caso contrário, retorna a pagina de sign In.               |
     * =======================================================================
    */
    app.get('/listProject', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Renderiza tela de listagem de projetos.*/
            return res.render("./project/listProject");
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            return res.redirect("/signIn");
        }
    });

    /** 
     * ========================================================================
     * |Route listProject responsável por verificar se o usuário possuí       |
     * |sessão aberta para acessar essa rota.                                 |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados    |
     * |são validos, e realiza a busca dos dados projetos requisitados,       |
     * |caso contrario, retorna o erro.                                       |
     * ========================================================================
    */
    app.post('/listProject', 
    [
        check('idProject', 'Id do projeto inválido').isInt()
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a busca dos projetos.*/
                return app.src.controllers.project.listProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*===============================DELETE PROJECT===============================*/
    /** 
     * ==========================================================================
     * |Route deleteProject responsável por verificar se o usuário possuí       |
     * |sessão aberta para acessar essa rota.                                   |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados      |
     * |são validos, e deleta o projeto, caso contrario, retorna o erro.        |
     * ==========================================================================
    */
    app.post('/deleteProject', 
    [
        check('idProject', 'Id do Projeto Inválido!').not().isEmpty().escape().isInt()
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller para deletar um determinado projeto.*/
                return app.src.controllers.project.deleteProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*================================UPLOAD DATASET==============================*/
    /** 
     * =======================================================================
     * |Route uploadDataset responsável por verificar se o usuário possuí    |
     * |sessão aberta.                                                       |
     * |Caso as condições sejam verdadeiras, verifica o dataset enviado e    |
     * |armazena-o na pasta do projeto.                                      |
     * =======================================================================
    */
    app.post('/uploadDataset', function(req, res){
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            /*Chamada do controller para realizar o upload do dataset de um determinado projeto.*/
            return app.src.controllers.project.uploadDataset(app, req, res);
        } 
        else {
            /*Envio da resposta.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*===============================DOWNLOAD MODEL===============================*/
    /** 
     * =======================================================================
     * |Route downloadModel responsável por verificar se o usuário possuí    |
     * |sessão aberta.                                                       |
     * |Caso as condições sejam verdadeiras, retorna o model requisitado     |
     * |pelo usuário.                                                        |
     * =======================================================================
    */
    app.get('/downloadModel', function(req, res){
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {
            
            /*Atribuição do path do arquivo passado como parâmetro na requisição.*/
            const idProject   = req.query.idProject;

            const path = "/home/marcelo/Desktop/plataforma-ml/Users/" + req.session.userEmail + "/projects/" + idProject + "/tflite/detect.tflite" 

            return res.download(path);
        } 
        else {
            /*Envio da resposta.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

};
/*============================================================================*/
