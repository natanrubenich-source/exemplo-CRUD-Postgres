-- Criando tabela Contatos
CREATE TABLE Contatos (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	telefone VARCHAR(20),
	email VARCHAR(80) NOT NULL UNIQUE,
	senha_hash VARCHAR(255) NOT NULL UNIQUE
	);