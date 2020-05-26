-- ============================================================== --
-- ====================Criação da base de dados================== --
-- ============================================================== --
CREATE DATABASE IF NOT EXISTS eccnno;
USE eccnno;

-- ============================================================== --
-- =================Criação da tabela de usuarios================ --
-- ============================================================== --
CREATE TABLE user (
    idUser            INT AUTO_INCREMENT PRIMARY KEY,
    userEmail         VARCHAR(128) NOT NULL UNIQUE,
    userName          VARCHAR(64)  NOT NULL,
    userPassword      VARCHAR(256) NOT NULL,
    userPhone         VARCHAR(64)  NOT NULL,
    registrationToken VARCHAR(512)
);

-- ============================================================== --
-- =================Criação da tabela de status================ --
-- ============================================================== --
CREATE TABLE status (
    idStatus    INT AUTO_INCREMENT PRIMARY KEY,
    statusName  VARCHAR(64) NOT NULL UNIQUE
);

-- ============================================================== --
-- =================Criação da tabela de projetos================ --
-- ============================================================== --
CREATE TABLE project (
    idProject   INT AUTO_INCREMENT PRIMARY KEY,
    idUser      INT          NOT NULL,
    idStatus    INT          NOT NULL DEFAULT 1,
    className   VARCHAR(64)  NOT NULL,
    projectName VARCHAR(128) NOT NULL UNIQUE,
    CONSTRAINT fk_project_id_user
        FOREIGN KEY (idUser) 
        REFERENCES user (idUser),
    CONSTRAINT fk_project_id_status
        FOREIGN KEY (idStatus) 
        REFERENCES status (idStatus)
);

-- ============================================================== --
-- ============================Inserts=========================== --
-- ============================================================== --

INSERT INTO user (userName, UserEmail, userPassword, userPhone) VALUES 
("Marcelo Dib Coutinho", "marcelo.dc98@hotmail.com", "$2a$11$baPIA0dFRI.FpXAVwCAR2./ia2hmWi24xyBf9y/tFM91dE6wwuKPa", "(19) 98273-6273");

INSERT INTO status (statusName) VALUES
("Aguardando Dataset"),
("Em treinamento"),
("Pronto para uso");

