import { Router } from "express";
import * as controller from "../controller/contatoController.js";

const routerContatos = Router();

// ROTAS PUBLICAS
routerContatos.post("/cadastrarUsuario", controller.criarContato); 
routerContatos.post("/login", controller.login);

// Privadas
routerContatos.get("/", controller.listar); // Converter para privada
routerContatos.get("/:id", controller.buscarPorID); // Converter para privada

export default routerContatos;