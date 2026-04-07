// Simular um banco de dados
import pool from "../database/db.js";
import bcrypt from 'bcryptjs';

export async function listarContatos() {
  try {
    const resultListagemGeral = await pool.query("SELECT * FROM Contatos");
    return resultListagemGeral.rows;
  } catch (error) {
    console.log("Erro ao consultar no banco de dados: ", error);
    return error;
  }
}

export async function buscarContatoID(id) {
  try {
    const resultadoPorID = await pool.query(
      `SELECT * FROM Contatos WHERE id = ${id}`,
    );
    return resultadoPorID.rows;
  } catch (error) {
    console.log("Erro ao consultar no banco de dados: ", error);
    return error;
  }
}

export async function cadastrarContato(nome, telefone, email, senha_hash) {
  try {
    // Inserindo os dados no banco de dados
    const inserirContatoDb = await pool.query(`
            INSERT INTO usuarios (nome, telefone, email, senha_hash)
            VALUES ('${nome}', '${telefone}', '${email}', '${senha_hash}') 
            RETURNING id, nome, telefone, email
        `);
    // Retornando os dados inseridos (sem a senha_hash!)
    return inserirContatoDb.rows[0];

  } catch (error) {
    console.log("Erro ao consultar no banco de dados: ", error);
    return error;
  }
}

export async function loginModule(email, senha) {
  try {
    // Puxando todo o registro onde tem o email
    const resRow = await pool.query(`SELECT * FROM usuarios WHERE email=$1`, [email]);

    console.log("RESULTADO DA ROW:", resRow.rows[0].senha_hash);
    // Compara as senhas para ver se o resultado é valido

    const resLogin = await bcrypt.compare(senha, resRow.rows[0].senha_hash);
    return resLogin;
    
  } catch (error) {
    console.log("Erro ao consultar no banco de dados: ", error);
    return error;
  }
}