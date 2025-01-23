# Projeto NorteTemp

Bem-vindo ao repositório do **NorteTemp**! Este documento fornece as instruções necessárias para instalar e configurar o projeto.

## Pré-requisitos
Antes de iniciar, certifique-se de que você possui as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 15 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) para gerenciar dependências
- [Git](https://git-scm.com/) para clonar o repositório

## Passo a Passo

### 1. Clone o Repositório do GitHub

Execute o comando abaixo para clonar o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/Messyas/nortetemp.git
```

### 2. Acesse o Diretório do Projeto

Entre no diretório do projeto clonado:

```bash
cd nortetemp
```

### 3. Instale as Dependências

Instale todas as dependências necessárias para o projeto. Certifique-se de estar no mesmo diretório onde o arquivo `package.json` está localizado.

#### Usando npm:
```bash
npm install --legacy-peer-deps
```

#### Usando yarn:
```bash
yarn install --ignore-peer-dependencies
```

### 4. Inicie o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute o comando:

#### Usando npm:
```bash
npm run dev
```

#### Usando yarn:
```bash
yarn dev
```

O servidor será iniciado em `http://localhost:3000` por padrão.
