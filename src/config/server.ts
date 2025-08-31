import express from "express";
import "dotenv/config";
import routes from "../routes/routes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
routes(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
