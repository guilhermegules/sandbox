-- DROP DATABASE empresa;

-- Creates

CREATE DATABASE empresa;
USE empresa;

CREATE TABLE Telefone (
	telefone_id INT NOT NULL AUTO_INCREMENT,
	ddd CHAR(2) NOT NULL,
	numero_telefone VARCHAR(13) NOT NULL,
	PRIMARY KEY(telefone_id)
);

CREATE TABLE Municipio (
	municipio_id INT NOT NULL AUTO_INCREMENT,
	municipio VARCHAR(30) NOT NULL,
	PRIMARY KEY(municipio_id)
);

CREATE TABLE Ramo_Atividade (
	ramo_id INT NOT NULL AUTO_INCREMENT,
	ramo VARCHAR(100) NOT NULL,
	PRIMARY KEY(ramo_id)
);

CREATE TABLE Tipo_Assinante (
	tipo_id INT NOT NULL AUTO_INCREMENT,
	tipo VARCHAR(100) NOT NULL,
	PRIMARY KEY(tipo_id)
);

CREATE TABLE Assinante (
	assinante_id INT NOT NULL AUTO_INCREMENT,
	assinante VARCHAR(100) NOT NULL,
	ramo_atividade_id INT NOT NULL,
	tipo_assinante_id INT NOT NULL,
	PRIMARY KEY(assinante_id),
	FOREIGN KEY(ramo_atividade_id) REFERENCES Ramo_Atividade(ramo_id),
	FOREIGN KEY(tipo_assinante_id) REFERENCES Tipo_Assinante(tipo_id)
);

CREATE TABLE Endereco (
	endereco_id INT NOT NULL AUTO_INCREMENT,
	endereco VARCHAR(100) NOT NULL,
	complemento VARCHAR(50) NOT NULL,
	bairro VARCHAR(50) NOT NULL,
	CEP CHAR(9) NOT NULL,
	telefone_id INT NOT NULL,
	municipio_id INT NOT NULL,
	assinante_id INT NOT NULL,
	PRIMARY KEY(endereco_id),
	FOREIGN KEY(telefone_id) REFERENCES Telefone(telefone_id),
	FOREIGN KEY(municipio_id) REFERENCES Municipio(municipio_id),
	FOREIGN KEY(assinante_id) REFERENCES Assinante(assinante_id)
);

-- Inserts

INSERT INTO Municipio (municipio) VALUES 
("Porto Alegre"),
("Guaíba"),
("Gravataí");

INSERT INTO Ramo_Atividade (ramo) VALUES 
("Tv à cabo"),
("Internet"),
("Serviços de casa"),
("Instalação de equipamentos"),
("Segurança");

INSERT INTO Tipo_Assinante (tipo) VALUES
("Semestral"),
("Mensal"),
("Quinzenal"),
("Anual");

INSERT INTO Telefone (ddd, numero_telefone) VALUES 
("11", "(55)690154686"),
("51", "(55)804521374"),
("51", "(55)205563927"),
("11", "(55)020547715"),
("18", "(55)660495114"),
("11", "(55)619075468"),
("51", "(55)779555248"),
("51", "(55)665404319"),
("11", "(55)938437174"),
("11","(55)733323662");

INSERT INTO Assinante (assinante, ramo_atividade_id, tipo_assinante_id) VALUES 
("Helen Rice", 1, 1),
("Veda Ford", 2, 3),
("Maisie Cross", 1, 2),
("Carson Stevens", 3, 4),
("Tate Bird", 1, 1),
("Harriet Walsh", 2, 3),
("Rebekah Nieves", 4, 2),
("Candace Morgan", 3, 3),
("Hanna Morrison", 4, 4),
("Josiah Pate", 1, 2);

INSERT INTO Endereco (endereco, complemento, bairro, CEP, telefone_id, municipio_id, assinante_id) VALUES 
("Rua Noel Guarany", "801", "Jardim dos lagos 1", "710592", 10, 2, 1),
("Rua Borges de Medeiros", "1200", "Centro histórico", "887523", 9, 1, 2),
("Rua João Alfredo", "2000", "Cidade baixa", "511992", 1, 1, 3),
("Av. Farrapos", "666", "Navegantes", "123578", 2, 1, 4),
("Rua fogaça da cruz", "138", "Natal", "802557", 3, 3, 5),
("Av. Centenário", "367", "Passo das pedras", "559158", 4, 3, 6),
("Rua Washington Luiz", "820", "Centro histórico", "648976", 5, 1, 7),
("Rua marechal josé inácio da silva", "355", "Passo da areia", "553322", 1, 1, 8),
("Av. Independência", "936","Centro histórico","38883", 6, 1, 9),
("Rua Riachuelo", "255","Centro histórico", "80528", 7, 1, 10),
("Rua Riachuelo", "255","Centro histórico", "80528", 6, 1, 10);

SELECT Assinante.assinante, Endereco.*, Telefone.* from Assinante
	INNER JOIN Endereco
		ON Assinante.assinante_id = Endereco.assinante_id
			INNER JOIN Telefone
				ON Endereco.telefone_id = Telefone.telefone_id;
				
SELECT Assinante.assinante, Ramo_Atividade.ramo	FROM Assinante
	INNER JOIN Ramo_Atividade
		ON Ramo_Atividade.ramo_id = Assinante.ramo_atividade_id
			ORDER BY Ramo_Atividade.ramo and Assinante.assinante; 

SELECT Assinante.* FROM Assinante
	INNER JOIN Tipo_Assinante 
		ON Tipo_Assinante.tipo_id = Assinante.tipo_assinante_id
			INNER JOIN Endereco 
				ON Endereco.assinante_id = Assinante.assinante_id
					INNER JOIN Municipio 
						ON Endereco.municipio_id = Municipio.municipio_id
							WHERE Municipio.municipio = "Gravataí" AND Tipo_Assinante.tipo = "Quinzenal";
						
SELECT Assinante.assinante FROM Assinante
	INNER JOIN Endereco
		ON Assinante.assinante_id = Endereco.assinante_id
			INNER JOIN Telefone 
				ON Endereco.telefone_id = Telefone.telefone_id
					GROUP BY Assinante.assinante
						HAVING COUNT(Telefone.telefone_id) >= 2;
					
SELECT Assinante.assinante, Telefone.numero_telefone FROM Assinante
	INNER JOIN Ramo_Atividade 
		ON Assinante.ramo_atividade_id = Ramo_Atividade.ramo_id
			INNER JOIN Endereco
				ON Assinante.assinante_id = Endereco.assinante_id 
					INNER JOIN Telefone
						ON Endereco.telefone_id = Telefone.telefone_id
							WHERE Endereco.bairro = "Centro histórico" or "Passo da areia";
