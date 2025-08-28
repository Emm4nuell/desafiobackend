import express from "express";
import routes from "../routes/routes"; // caminho correto para seu arquivo

const app = express();
const PORT = 3000;

app.use(express.json());

// Registrar rotas
routes(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
