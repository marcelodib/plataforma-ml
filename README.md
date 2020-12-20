# Plataform ML (Machine Learning)

A plataforma ML tem como objetivo ajudar pessoas leigas em machine learning a desenvolverem modelos computacionais capazes de detectar objetos em tempo real.
Dessa forma, para sua utilização é necessário apenas possuir o dataset do objeto que deseja que o modelo aprenda. Assim uma plataforma web foi desenvolvida para que seja possível a criação de conta como usuário, e após sua autenticação é possível criar seu projetos, importar seus dataset para que o servidor realize o treinamento, e por fim você pode testa-lo na aplicação mobile, ou baixar o modelo e utiliza-lo na sua própria aplicação.

### Desenvolvimento
| Funcionalidade | Status |
| ------ | ------ |
| Criação de conta | ✓ |
| Autenticação do usuário | ✓ |
| Criação de projeto | ✓ |
| Listagem de projetos | ✓ |
| Upload de datasets | ✓ |
| Download de modelos | ✓ |
| Testes via aplicação mobile | ✓ |

 
 ### Andamento do projeto
https://trello.com/b/W1vBZgwn/plataforma-ml

### Preparando ambiente

####Atualizando ambiente
```sh
$ sudo apt update 
$ sudo apt upgrade
$ sudo apt install build-essential 
$ sudo apt install cmake git unzip zip
$ sudo apt install python-dev python3-dev python-pip python3-pip
$ sudo apt install linux-headers-$(uname -r)
$ sudo apt autoremove
$ sudo apt autoclean
```

#### Caso o PIP apresente erros, use os comando abaixo
```sh
$ hash -d pip
$ sudo python3 -m pip uninstall pip && sudo apt install python3-pip --reinstall
$ sudo python -m pip uninstall pip
$ sudo apt remove python-pip
$ sudo whereis pip
$ wget https://bootstrap.pypa.io/get-pip.py -O /tmp/get-pip.py
$ sudo python3 /tmp/get-pip.py
$ pip install --user pipenv
$ pip3 install --user pipenv
$ echo "PATH=$HOME/.local/bin:$PATH" >> ~/.profile
$ source ~/.profile
$ whereis pip
```

#### Baixando dependências
```sh
$ apt install protobuf-compiler python-pil python-lxml
$ pip install -U --user pip six numpy wheel mock
$ pip3 install -U --user pip six numpy wheel mock
$ pip install -U --user keras_applications
$ pip3 install -U --user keras_applications
$ pip install -U --user keras_preprocessing
$ pip3 install -U --user keras_preprocessing
$ pip install jupyter
$ pip install matplotlib
```

#### Instalando BAZEL 0.24.1
```sh
$ cd ~/
$ wget https://github.com/bazelbuild/bazel/releases/download/0.24.1/bazel-0.24.1-installer-linux-x86_64.sh
$ chmod +x bazel-0.24.1-installer-linux-x86_64.sh
$ ./bazel-0.24.1-installer-linux-x86_64.sh --user
$ echo 'export PATH="$PATH:$HOME/bin"' >> ~/.bashrc
$ source ~/.bashrc
$ sudo ldconfig
```

#### Caso ocorra erros com o BAZEL 0.24.1, instale a versão 0.17.2
```sh
$ cd ~/
$ wget https://github.com/bazelbuild/bazel/releases/download/0.17.2/bazel-0.17.2-installer-linux-x86_64.sh
$ chmod +x bazel-0.17.2-installer-linux-x86_64.sh
$ ./bazel-0.17.2-installer-linux-x86_64.sh --user
$ echo 'export PATH="$PATH:$HOME/bin"' >> ~/.bashrc
$ source ~/.bashrc
$ sudo ldconfig
```

#### Instalando TENSORFLOW 1.13.1
```sh
$ sudo pip3 install tensorflow==1.13.1
$ sudo pip install tensorflow==1.13.1
```

#### Baixando TENSORFLOW Models
```sh
$ git clone https://github.com/tensorflow/models.git
```

#### Atualizando PROTOBUF
```sh
$ curl -OL https://github.com/google/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip
$ unzip protoc-3.6.1-linux-x86_64.zip -d protoc3
$ sudo mv protoc3/bin/* /usr/local/bin/
$ sudo mv protoc3/include/* /usr/local/include/
$ sudo chown $USER /usr/local/bin/protoc
$ sudo chown -R $USER /usr/local/include/google
$ sudo ldconfig
```

#### Instalando COCO API
```sh
$ cd models/research/
$ bash object_detection/dataset_tools/create_pycocotools_package.sh /pycocotools
$ python3 setup.py sdist
$ (cd slim && python setup.py sdist)
```

#### Instalando FLUTTER
https://flutter.dev/docs/get-started/install/linux

#### Instalando NODE JS
https://nodejs.org/en/download/
```sh
$ sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt -y install nodejs
$ sudo apt -y  install gcc g++ make
```

#### Instalando MYSQL
https://dev.mysql.com/downloads/mysql/
```sh
$ sudo apt install mysql-server
$ sudo mysql_secure_installation
```

#### Criando Banco de Dados
Acesse o Mysql e crie um database chamado platformML
```sh
$ mysql --user="SEU_USUARIO" -p
$ CREATE DATABASE platformML;
$ exit;
```
```sh
$ mysql --user="SEU_USUARIO" --database="platformML" -p < "database/database.sql"
```

#### Criando variáveis de ambiente
```sh
$ cd backend-web
$ touch .env
```

### Execução

#### Backend
Após executar o comando abaixo a aplicação web estará disponível em http://localhost:3000
```sh
$ cd backend-web
$ node install
$ node app
```

#### Mobile App
```sh
$ cd mobile_app
$ flutter run
```
