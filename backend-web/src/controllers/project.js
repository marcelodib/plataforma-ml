/*===============================IMPORT MODULES===============================*/
const multer = require('multer');
/*============================================================================*/

/*============================PROJECT CONTROLLERS=============================*/

/*===============================CREATE PROJECT===============================*/
/**
 * ================================================================
 * |Controller createProject responsável por verificar se existe  |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é realizado a inserção   |
 * |do novo projeto na base de dados.                             |
 * ================================================================
 */
module.exports.createProject = async function (app, req, res) {
    try {
        if (req.session.idUser != undefined) {      
            /*Atribuição dos dados enviados no corpo da requisição.*/
            const project = {...req.body, idUser: req.session.idUser};

            const idProjet = await app.src.services.project.insertProject(app, project);

            app.src.utils.shell.mkdirProject(req.session.userEmail, idProjet);
            app.src.utils.configProject.createConfig(req.session.userEmail, idProjet);
            app.src.utils.configProject.createPbtxt(req.session.userEmail, idProjet, project.className);
            
            /*Envio da respostas*/
            return res.status(200).send({status: "success", msg: "Novo projeto criado com sucesso!"});
        } else {
            /*Envio da respostas.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    } catch (error) {
        /*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "createProject");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao inserir o projeto!"});
    }
}
/*============================================================================*/

/*================================LIST PROJECT================================*/
/**
 * ================================================================
 * |Controller listProject responsável por verificar se existe    |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é verificado os dados    |
 * |enviados e realizado a busca pelos projetos requisitadas.     |
 * ================================================================
 */
module.exports.listProject = async function (app, req, res) {
    try {
        if (req.session.idUser != undefined) {      
        
            const idProject = req.body.idProject;
            const idUser    = req.session.idUser

            const projects = await app.src.services.project.selectProject(app, idProject, idUser);

            /*Envio da respostas*/
			return res.status(200).send({status: "success", msg: "Projetos encontradas com sucesso!", data: projects});
        } else {
            /*Envio da respostas*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    } catch (error) {
        /*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "listProject");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao buscar os projetos!"});
    }
}
/*============================================================================*/

/*===============================DELETE PROJECT===============================*/
/**
 * ================================================================
 * |Controller deleteProject responsável por verificar se existe  |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é verificado os dados    |
 * |enviados e realizado a remoção do projeto requisitado.        |
 * ================================================================
 */
module.exports.deleteProject = async function (app, req, res) {
    try {
        if (req.session.idUser != undefined) {  
            const idProject = req.body.idProject;
            const idUser    = req.session.idUser

            await app.src.services.project.deleteProject(app, idProject, idUser);

            app.src.utils.shell.rmProject(req.session.userEmail, idProject);

            /*Envio da respostas*/
			return res.status(200).send({status: "success", msg: "Projeto removido com sucesso!"});
        } else {
            /*Envio da respostas*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    } catch (error) {
        /*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "deleteProject");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao remover o projeto!"});
    }
}
/*============================================================================*/

/*===============================UPLOAD DATASET===============================*/
/**
 * ================================================================
 * |Controller uploadDataset responsável por verificar se existe  |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é verificado os dados    |
 * |enviados e realizado o upload do dataset do projeto.          |
 * ================================================================
 */
module.exports.uploadDataset = async function (app, req, res) {
    try {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser != undefined) {      
            
            /*Variável que contém o identificador do projeto que receberá o dataset enviado.*/
            const idProject = req.query.idProject;
            const idUser    = req.session.idUser

            /*Verificação do idProject enviado como parâmetro.*/
            if (idProject == undefined || idProject == null || isNaN(idProject) || idProject < 1) {
                return res.status(400).send({ status: "error", msg: "Identificador do projeto inválido!"});
            }

            const project = await app.src.services.project.selectProject(app, [idProject], idUser);

            /*Verificação se o projeto encontrado condiz com o requisitado.*/
            if (project.length > 0 && project[0].idStatus == 1) {

                /*Chamada das funçoẽs que realiza a configuração do armazenamento do dataset.*/
                const storage = multer.diskStorage({
                    destination: function (req, file, callback) {
                        callback(null, '/home/marcelo/Desktop/plataforma-ml/Users/' + req.session.userEmail + '/projects/' + project[0].idProject);
                    },
                    filename: function (req, file, callback) {
                        callback(null, 'dataset.zip');
                    }
                });

                const upload = multer({ storage : storage}).single('dataset');

                upload(req, res, async function(err) {
                    /*Verificação se ocorreu algum erro no recebimento do dataset.*/
                    if(err) {
                        res.status(500).send({status: "error", msg: "Ocorreu uma falha no upload do dataset!" + err});
                    }

                    /*Chamada da função que realiza o unzip do dataset.*/
                    app.src.utils.shell.unzip(req.session.userEmail, project[0].idProject);

                    /*Atribuição da função isValid para validação do token.*/
                    await app.src.services.project.updateStatusProject(app, project[0].idProject, idUser);

                    /*Chamada da função que realiza a configuração final e inicia o treinamento.*/
                    app.src.utils.shell.startTrain(req.session.userEmail, project[0].idProject, project[0].className);

                    return res.status(200).send({status: "success", msg: "Upload realizado com sucesso!\nIniciando Treinamento..."});
                });
            } else {
                console.log(projects);
                return res.status(400).send({status: "error", msg: "O projeto já contém um dataset!"});
            }
        } else {
            /*Envio da respostas*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    } catch (error) {
        /*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "uploadDataset");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao realizar o upload do dataset!"});
    }
}
/*============================================================================*/

/*===============================DOWNLOAD MODEL===============================*/
/**
 * ================================================================
 * |Controller downloadModel responsável por verificar se existe  |
 * |sessão aberta para acessar esse controller.                   |
 * |Caso as condições sejam verdadeiras, é verificado os dados    |
 * |enviados e realizado o envio do modelo requisitado.           |
 * ================================================================
 */
module.exports.downloadModel = async function (app, req, res) {
    try {
        if (req.session.idUser != undefined) {  
            /*Atribuição do dados para formar path do arquivo requirido.*/
            const idProject = req.query.idProject;
            const format    = req.query.format;

            let path = ""

            if (format === "model") {
                /*Atribuição do caminho do arquivo a ser enviado.*/
                path = `/home/marcelo/Desktop/plataforma-ml/Users/${req.session.userEmail}/projects/${idProject}/${idProject}-model.zip`; 
            }

            if (format === "pb") {
                /*Atribuição do caminho do arquivo a ser enviado.*/
                path = `/home/marcelo/Desktop/plataforma-ml/Users/${req.session.userEmail}/projects/${idProject}/${idProject}-pb.zip`; 
            }

            if (format === "tflite") {
                /*Atribuição do caminho do arquivo a ser enviado.*/
                path = `/home/marcelo/Desktop/plataforma-ml/Users/${req.session.userEmail}/projects/${idProject}/${idProject}-tflite.zip`; 
            }
            /*Envio da resposta.*/
            return res.download(path);
        } else {
            /*Envio da respostas*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    } catch (error) {
        /*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "downloadModel");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao enviar o modelo!"});
    }
}
/*============================================================================*/

/*============================================================================*/

