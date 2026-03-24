// Simular um banco de dados
import pool from "../database/db.js";

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

export async function cadastrarContato(nome, telefone, email) {
  try {
    const inserirContatoDb = await pool.query(`
            INSERT INTO Contatos (nome, telefone, email)
            VALUES ('${nome}', '${telefone}', '${email}') 
            RETURNING *
        `);

    return inserirContatoDb.rows[0];
  } catch (error) {
    console.log("Erro ao consultar no banco de dados: ", error);
    return error;
  }
}
