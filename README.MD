# Desafio:
#### Desenvolver uma aplicação web que permita o cadastro de url longas.

# Tecnologias utilizadas:
*MongoDB*
*Node.js*
*Express*
*AngularJS*
*Grunt*
*Less*

# Configurações:
Para configurar a conexão do mongo e o AppID do Facebook, utilize os arquivos json corresponde ao tipo de ambiente desejado, localizados na pasta config/env.

# Instalação:
Comandos necessários:
*npm install*
*bower install*

# Comandos:
*grunt build: Cria um build do projeto para distribuição, concatenando e minificando os arquivos css e js. Os arquivos resultantes serão armazenados na pasta "dist";*

*grunt dev: Inicializa o servidor em ambiente de desenvolvimento;*

*grunt run: Inicializa o servidor em ambiente de produção. Antes da inicialização a task "build" e executada e a pasta "dist" será criada;*

*grunt less - Processa os arquivos less transformando-os em css.*


Demo: http://myshortener.herokuapp.com
