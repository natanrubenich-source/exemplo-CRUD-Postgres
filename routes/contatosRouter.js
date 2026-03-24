import { Router } from "express";
import * as controller from "../controller/contatoController.js";

const routerContatos = Router();

routerContatos.get("/", controller.listar); // Feita com BD
routerContatos.get("/:id", controller.buscarPorID); // Feita com BD
routerContatos.post("/criarContatos", controller.criarContato); // Feita com BD

export default routerContatos;