import express from "express";
import "dotenv/config";
import routerUsuarios from "./routes/contatosRouter.js";

const app = express();
app.use(express.json());
const SERVER_PORT = process.env.SERVER_PORT;

app.use("/usuario", routerUsuarios);

app.listen(SERVER_PORT, () => {
  console.log(`Aplicação rodando em: http://localhost:${SERVER_PORT}`);
});
