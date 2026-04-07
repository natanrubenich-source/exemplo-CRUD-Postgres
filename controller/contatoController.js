import * as module from "../model/contatosModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function listar(req, res) {
  const todaLista = await module.listarContatos();
  console.log(todaLista);
  res.status(200).json(todaLista);
}

export async function buscarPorID(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(422).json({ mensagem: "Dados incompletos!" });
  }
  const resultadoContato = await module.buscarContatoID(id);

  // Tratamento do resultado
  if (!resultadoContato) {
    res.satus(404).json({ erro: "Usuairo não existe!" });
  } else {
    res.status(200).json(resultadoContato);
  }
}

export async function criarUsuario(req, res) {
  //id, nome, telefone e email, senha.
  const { nome, telefone, email, senha } = req.body;

  if (!nome || !telefone || !email || !senha) {
    res.status(422).json({ mensagem: "Dados incompletos!" });
  } else {

    // Criptografando a senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // Cadastra o usuário no module
    const novoContato = await module.cadastrarContato(nome, telefone, email, senha_hash);
    res.status(201).json(novoContato);
    // melhorar o tratamento de erro caso retorne um erro!
  }
}

export async function login(req, res) {
  const {email, senha} = req.body;

  if (!email || !senha) {
    res.status(422).json({ mensagem: "Dados incompletos!" });
  }

  // Chamando o module para puxar e comprar as senhas
  const cadastroRes = await module.loginModule(email, senha);

  // Verificando o resultado da função do module
  if (cadastroRes == false){
    return res.status(401).json({ erro: "Credenciais Invalidas"});

  } else if (cadastroRes == true){
    // Login e senha validos!
    const token = jwt.sign(
      {email: email},
      process.env.JTW_SECRET,
      {expiresIn: process.env.JWT_EXPIRES_IN}
    );
    // Retornando o token assinado
    return res.status(200).json({token});

  } else{
    return res.status(404).json({ erro: "Erro ao processar a requisição"});
  }
}

export async function perfilController(req, res) {
  
}