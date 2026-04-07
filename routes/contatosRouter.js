import { Router } from "express";
import * as controller from "../controller/contatoController.js";
import { autenticar } from "../middleware/auth.middleware.js";

const routerUsuarios = Router();

// ROTAS PUBLICAS
routerUsuarios.post("/cadastrarUsuario", controller.criarUsuario); 
routerUsuarios.post("/login", controller.login);

// Privadas - Em construção
routerUsuarios.post("/perfil", autenticar, controller.perfilController);

routerUsuarios.get("/", controller.listar); // Converter para privada
routerUsuarios.get("/:id", controller.buscarPorID); // Converter para privada

export default routerUsuarios;