/*===============================IMPORT MODULES===============================*/
const { check, validationResult } = require('express-validator'); /*Modulo responsável por fazer a validação dos dados que chegam nas requisições.*/
const multer = require('multer');
const {unzip} = require("../utils/shell"); /*Modulo responsável por gerar log de eventos de erro.*/
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
        /*Atribuição da função isValid para validação do token.*/
        const isValid = app.app.controllers.sign.isValid;
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.token != undefined && 
            isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
            /*Renderiza tela de criação de projeto.*/
            res.render("./project/createProject");
            return;
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            res.redirect("/signIn");
            return;
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
        ], function (req, res) {
                /*Atribuição da função isValid para validação do token.*/
                const isValid = app.app.controllers.sign.isValid;
                /*Verificação se o usuário possui permissão para acessar essa rota.*/
                if (req.session.token != undefined && 
                    isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
                    /*Chamada da função que valida os dados da requisição.*/
                    const errors = validationResult(req)
                    /*Verificação se os parâmetros não apresentam inconsistências.*/            
                    if (!errors.isEmpty()) {
                        /*Envio da respostas.*/
                        res.send({status: "error", msg: errors.array()});
                        return;
                    }
                    else {
                        /*Chamada do controller parar realizar a inserção do novo projeto.*/
                        app.app.controllers.project.createProject(app, req, res);
                    }
                }
                else {
                    /*Envio da respostas.*/
                    res.send({status: "error", msg: "Acesso Negado!"});
                    return;
                }
            }
        );
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
        /*Atribuição da função isValid para validação do token.*/
        const isValid = app.app.controllers.sign.isValid;
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.token != undefined && 
            isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
            /*Renderiza tela de listagem de projetos.*/
            res.render("./project/listProject");
            return;
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            res.redirect("/signIn");
            return;
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
    app.post('/listProject', [check('idProject', 'Id do projeto inválido').isInt()], 
    function (req, res) {
        /*Atribuição da função isValid para validação do token.*/
        const isValid = app.app.controllers.sign.isValid;
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.token != undefined && 
            isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                res.send({status: "error", msg: errors.array()});
                return;
            }
            else {
                /*Chamada do controller parar realizar a busca dos projetos.*/
                app.app.controllers.project.listProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            res.send({status: "error", msg: "Acesso Negado!"});
            return;
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
    app.post('/deleteProject', [check('idProject', 'Id do Projeto Inválido!').not().isEmpty().escape().isInt()], 
    function (req, res) {
        /*Atribuição da função isValid para validação do token.*/
        const isValid = app.app.controllers.sign.isValid;
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.token != undefined && 
            isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                res.send({status: "error", msg: errors.array()});
                return;
            }
            else {
                /*Chamada do controller para deletar um determinado projeto.*/
                app.app.controllers.project.deleteProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            res.send({status: "error", msg: "Acesso Negado!"});
            return;
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
        /*Atribuição da função isValid para validação do token.*/
        const isValid = app.app.controllers.sign.isValid;
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.token != undefined && 
            isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
                const idProject = req.query.idProject;

                const storage = multer.diskStorage({
                    destination: function (req, file, callback) {
                        callback(null, './upload');
                    },
                    filename: function (req, file, callback) {
                        callback(null, file.fieldname + idProject +  '.zip');
                    }
                });
                const upload = multer({ storage : storage}).single('dataset');
                
                upload(req,res,function(err) {
                    if(err) {
                        res.send({status: "error", msg: "Falha no upload do dataset!"});
                        return;
                    }
                    res.send({status: "success", msg: "Upload realizado com sucesso!\nIniciando Treinamento..."});
                    return;
                });
                
            return;
        } 
        else {
            /*Envio da resposta.*/
            res.send({status: "error", msg: "Acesso Negado!"});
            return;
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
        /*Atribuição da função isValid para validação do token.*/
        const isValid = app.app.controllers.sign.isValid;
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.token != undefined && 
            isValid(req.session.userEmail + req.session.userName + req.session.idUser.toString(), req.session.token)) {
            
            /*Atribuição do path do arquivo passado como parâmetro na requisição.*/
            //const idProject   = req.query.idProject;

            //const path = "./users/" + req.session.userEmail + "/projects/" + idProject + "/models/model.tflite" 
            const path = "../upload/detect.tflite" 
            startTrain();
            
            res.download(path);
            return;
        } 
        else {
            /*Envio da resposta.*/
            res.send({status: "error", msg: "Acesso Negado!"});
            return;
        }
    });
/*============================================================================*/

};
/*============================================================================*/
