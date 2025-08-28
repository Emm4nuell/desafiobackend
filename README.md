# 📌 Projeto Node.js com Express, Prisma e PostgreSQL

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-blue?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/PostgreSQL-15.x-blue?logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Prisma-ORM-purple?logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/Zod-Validation-orange" alt="Zod">
  <img src="https://img.shields.io/badge/Bcrypt-Password%20Hash-yellow" alt="Bcrypt">
</p>

---

## 📖 Sobre o Projeto

Este projeto é um **backend em Node.js** utilizando:
- **Express** para rotas e middlewares  
- **PostgreSQL** como banco de dados relacional  
- **Prisma ORM** para manipulação do banco  
- **Zod** para validação de dados  
- **Bcrypt** para hash de senhas  
- **Nodemon** para hot reload em desenvolvimento  

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Prisma](https://www.prisma.io/)  
- [Zod](https://zod.dev/)  
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)  
- [Nodemon](https://nodemon.io/)  

## ⚙️ Configuração do Ambiente

### 1️⃣ Clonar o repositório
```bash
https://github.com/Emm4nuell/desafiobackend.git
```

### 2️⃣ Instalar dependências
```bash
npm install
```

Dependências principais:
```bash
npm install express bcrypt zod @prisma/client
```

Dependências de desenvolvimento:
```bash
npm install -D nodemon prisma typescript ts-node @types/express @types/bcrypt
```

### 3️⃣ Configurar variáveis de ambiente (`.env`)
```env
DATABASE_URL="postgresql://postgres:administrador@localhost:5432/projetobackend"
```

### 4️⃣ Inicializar Prisma
```bash
npx prisma init
npx prisma migrate dev --name init
```

---

## ▶️ Executando o Projeto

### Desenvolvimento (com hot reload)
```bash
nodemon dev
```

### Produção
```bash
npm run build
npm start
```

---

## 📌 Scripts disponíveis

No `package.json`:
```json
"scripts": {
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "prisma:migrate": "prisma migrate dev",
  "prisma:studio": "prisma studio"
}
```

---

## 📜 Rotas de Exemplo

### Criar Usuário
`POST /users`
```json
{
  "name": "Eduardo",
  "email": "eduardo@email.com",
  "password": "123456"
}
```

### Listar Usuários
`GET /users`

---

