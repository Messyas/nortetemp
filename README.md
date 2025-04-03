# Projeto NorteTemp

Bem-vindo ao repositório do **NorteTemp**! Este documento fornece as instruções necessárias para instalar, configurar e executar o projeto.

---

## 📸 Visão resumida do projeto

O **NorteTemp** é uma plataforma meteorológica voltada para diferentes tipos de usuários, oferecendo dados em tempo real sobre o clima. O projeto foi desenvolvido com foco em acessibilidade e segmentação de usuários, utilizando serviços em nuvem para autenticação, envio de mensagens e obtenção de dados meteorológicos.

A autenticação é feita com **AWS Cognito**, permitindo um gerenciamento seguro de usuários (como jornalistas, agricultores e usuários padrão).

Além disso, o projeto adota uma **arquitetura de microsserviços**, onde funções serverless via **AWS Lambda** são responsáveis por executar o envio das mensagens de forma isolada e escalável. As funções realizam o **envio periódico de mensagens para bots no Telegram**, de acordo com a segmentação de usuários e dados atualizados do clima.

### Tela de Login
<p align="center">
  <img src="https://github.com/Messyas/nortetemp/blob/main/nortetemp/public/inicio.png" width="600"/>
</p>

Usuários autenticados podem visualizar informações meteorológicas relevantes para o seu perfil por meio de um painel interativo:

### Dashboard
<p align="center">
  <img src="https://github.com/Messyas/nortetemp/blob/main/nortetemp/public/dashboard.png" width="600"/>
</p>

Além disso, é possível acompanhar a condição climática em tempo real por meio do mapa:

### Mapa
<p align="center">
  <img src="https://github.com/Messyas/nortetemp/blob/main/nortetemp/public/map.png" width="600"/>
</p>

---

## 🌐 APIs Utilizadas

- **Telegram Bot API**: Envio de mensagens automáticas para canais ou grupos no Telegram, segmentados por tipo de usuário.
- **AccuWeather API**: Consulta de dados meteorológicos (previsões, localização, etc.).
- **AWS Cognito**: Autenticação e gerenciamento de usuários.
- **GNews API**: Coleta de manchetes e notícias meteorológicas.

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de que você possui as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 15 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## 🛠️ Instalação Passo a Passo

### 1. Clone o Repositório

\`\`\`bash
git clone https://github.com/Messyas/nortetemp.git
\`\`\`

### 2. Acesse o Diretório

\`\`\`bash
cd nortetemp
\`\`\`

### 3. Instale as Dependências

#### Usando npm:

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

---

## 🔐 Configuração de Variáveis de Ambiente

O projeto depende de variáveis de ambiente para integração com as APIs externas. Siga os passos abaixo para configurá-las corretamente.

## Crie o arquivo \`.env\`

Na raiz do projeto, crie um arquivo .env e adicione as chaves de API necessárias para rodar a aplicação. O repositório contém um arquivo de exemplo (.env.example) com o nome correto das variáveis de ambiente que devem ser fornecidas.

## ▶️ Rodando o Projeto

Para iniciar o servidor local:

#### Usando npm:

\`\`\`bash
npm run dev
\`\`\`

O projeto estará disponível em \`http://localhost:3000\`.

---
