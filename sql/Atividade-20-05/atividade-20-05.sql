-- QUESTÃO 6 
DROP DATABASE IF EXISTS AVALIACAON1BDA;

CREATE DATABASE AVALIACAON1BDA;

USE AVALIACAON1BDA;

CREATE TABLE Carro (
	placa VARCHAR(12) NOT NULL PRIMARY KEY,
	ano DATE NOT NULL,
	marca VARCHAR(30) NOT NULL,
	modelo INT(4) NOT NULL
);

CREATE TABLE Servico (
	id_servico INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	placa VARCHAR(12) NOT NULL,
	estado CHAR(2) NOT NULL,
	valor DOUBLE NOT NULL,
	FOREIGN KEY (placa) REFERENCES Carro(placa) 
);

ALTER TABLE Servico 
ADD CONSTRAINT SERVICO_PLACA_FK
FOREIGN KEY (placa) REFERENCES Carro(placa)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE Servico 
ADD CONSTRAINT SERVICO_ESTADO
CHECK (estado IN ("RS", "SC", "PR"));

ALTER TABLE Carro 
ADD CONSTRAINT CARRO_MODELO_ANO
CHECK (modelo >= 1990);

-- QUESTÃO 7

-- BANCO LOJA
 DROP DATABASE IF EXISTS LOJA;
 
 CREATE DATABASE LOJA;
 USE LOJA;
 
 CREATE TABLE cliente (
   codcliente INT(4) NOT NULL,
   cliente VARCHAR(100) NOT NULL,
   cpf VARCHAR(11) NOT NULL,
   endereco VARCHAR(30) NOT NULL,
   PRIMARY KEY (codcliente)
 );
 
 INSERT INTO cliente VALUES (1,'João da Silva','123456789  ','Rua Andradas, 250             '),
 (2,'Maria do Rosário','26547899   ','Rua Lima e Silva, 648         '),
 (3,'Paulo Silveira','8963254    ','Rua Plínio Brasil Milano, 980 '),
 (4,'Rosa Aparecida dos Santos','5896332123 ','Av. Ipiranga, 8960            '),
 (5,'Paula Nunes','675433332  ','Av. Assis Brasil, 60          '),
 (6,'João da Silva','123456789  ','Rua Andradas, 250             '),
 (7,'Maria do Rosário','26547899   ','Rua Lima e Silva, 648         '),
 (8,'Paulo Silveira','8963254    ','Rua Plínio Brasil Milano, 980 '),
 (9,'Rosa Aparecida dos Santos','5896332123 ','Av. Ipiranga, 8960            '),
 (10,'Paula Nunes','675433332  ','Av. Assis Brasil, 60          ');
 
 CREATE TABLE funcionario (
   codfuncionario INT(4) NOT NULL,
   funcionario VARCHAR(100) NOT NULL,
   dataadmissao VARCHAR(19) NOT NULL,
   PRIMARY KEY (codfuncionario)
 ); 
 
 INSERT INTO funcionario VALUES (4,'Fátima de Jesus','2005-08-12 00:00:00'),
 (5,'Rafael Gastão','2006-08-10 00:00:00');
 
 CREATE TABLE itensvenda (
 	coditens INT NOT NULL AUTO_INCREMENT,
   	nnf INT(4) NOT NULL,
   	dtvenda VARCHAR(19) NOT NULL,
   	codproduto INT(4) NOT NULL,
   	qtde DECIMAL(2,1) NULL,
 	PRIMARY KEY(coditens)
 );
 
 INSERT INTO itensvenda VALUES (null,1,'2016-04-20 00:00:00',1,1.0),
 (null,1,'2016-04-20 00:00:00',2,2.0),
 (null,1,'2016-04-25 00:00:00',3,9.0),
 (null,1,'2016-04-30 00:00:00',3,7.0),
 (null,2,'2016-04-20 00:00:00',1,3.0),
 (null,2,'2016-04-20 00:00:00',2,2.0),
 (null,2,'2016-04-20 00:00:00',4,4.0),
 (null,3,'2016-08-11 00:00:00',1,1.0),
 (null,3,'2016-08-11 00:00:00',2,2.0);
 
 CREATE TABLE produto (
   codproduto INT(4) NOT NULL,
   descricaoproduto VARCHAR(18) NOT NULL,
   unidade VARCHAR(2) NOT NULL,
   preco DECIMAL(3,2) NOT NULL,
   PRIMARY KEY (codproduto)
 );
 
 INSERT INTO produto VALUES (1,'Coca Cola','Lt',1.20),
 (2,'Presunto Sadia','Kg',5.40),
 (3,'Sabonete Palmolive','Un',0.65),
 (4,'Shampoo Colorama','Un',2.60),
 (5,'Cerveja Skol','Gf',0.99),
 (6,'Coca Cola','Lt',1.20),
 (7,'Presunto Sadia','Kg',5.40),
 (8,'Sabonete Palmolive','Un',0.65),
 (9,'Shampoo Colorama','Un',2.60),
 (10,'Cerveja Skol','Gf',0.99),
 (11,'Coca Cola','Lt',1.20),
 (12,'Presunto Sadia','Kg',5.40),
 (13,'Sabonete Palmolive','Un',0.65),
 (14,'Shampoo Colorama','Un',2.60),
 (15,'Cerveja Skol','Gf',0.99);
 
 CREATE TABLE tipospagamento (
   codpagamento INT(4) NOT NULL,
   descricaotppagamento VARCHAR(17) NOT NULL,
   PRIMARY KEY (codpagamento)
 );
 
 INSERT INTO tipospagamento VALUES (1,'Cheque'),
 (2,'Dinheiro'),
 (3,'Crediário'),
 (4,'Cartão de Crédito'),
 (5,'Fio do Bigode');
 
 CREATE TABLE venda (
   codvenda INT NOT NULL AUTO_INCREMENT,	
   nnf INT(4) NOT NULL,
   dtvenda DATE NOT NULL,
   codcliente INT(4) NOT NULL,
   codpagamento INT(4) NOT NULL,
   vlvenda DECIMAL(3,1) NOT NULL,
   PRIMARY KEY (codvenda),
   FOREIGN KEY (codcliente) REFERENCES cliente(codcliente),
   FOREIGN KEY (codpagamento) REFERENCES tipospagamento(codpagamento)
 );
 
 INSERT INTO venda VALUES (null,1,'2016-04-20',1,1,15.0),
 (null,1,'2016-04-25',3,2,7.9),
 (null,1,'2016-04-30',3,4,8.5),
 (null,2,'2016-04-20',2,1,7.5),
 (null,3,'2016-08-11',6,4,15.0),
 (null,4,'2016-08-11',7,4,7.5),
 (null,5,'2016-08-11',8,4,7.9),
 (null,6,'2016-08-11',9,4,8.5),
 (null,6,'2016-08-11',9,4,8.5),
 (null,6,'2016-08-11',9,4,8.5),
 (null,7,'2016-08-11',10,4,8.5);

-- RESOLUÇÃO 

CREATE VIEW LOJA_VIEW_COMPRAS
AS SELECT * FROM venda WHERE dtvenda LIKE "2016-08-11 00:00:00";


-- ATIVIDADE 8
CREATE VIEW LOJA_VIEW_CLIENTES
AS SELECT cliente.cliente as nome, sum(codvenda) as "quantidade vendas"
FROM cliente
INNER JOIN venda
ON cliente.codcliente = venda.codcliente
WHERE YEAR(venda.dtvenda) BETWEEN "2013" AND "2015";

-- ATIVIDADE 9
DROP DATABASE IF EXISTS fruteira;

CREATE DATABASE fruteira;

USE fruteira;
-- ATIVIDADE 9A
START TRANSACTION;
	CREATE TABLE Frutas (
		codigo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(50) NOT NULL,
		valor DOUBLE NOT NULL,
		estoque int(3) NOT NULL
	);
COMMIT;

-- ATIVIDADE 9B
START TRANSACTION;
	INSERT INTO Frutas (codigo, nome, valor, estoque) VALUES (NULL, "Abacaxi", 4.30, 100),
	(NULL, "Uva", 2.90, 41),
	(NULL, "Pêra", 1.45, 700),
	(NULL, "Laranja", 3.40, 400),
	(NULL, "Pêssego", 1.50, 900),
	(NULL, "Melão", 6.80, 20);
COMMIT;

-- ATIVIDADE 9C
START TRANSACTION;
	ALTER TABLE Frutas ADD estoque_min INT NOT NULL;
COMMIT;

-- ATIVIDADE 9D
START TRANSACTION;
	ALTER TABLE Frutas ADD valor_estoque DOUBLE NOT NULL;
COMMIT;

SELECT * FROM Frutas;
/*Criar um cursor para selecionar o código, a data e valor das vendas.
 * Caso o valor da venda seja superior a R$ 10,00, mostrar o código da
 * venda, data, valor da venda e valor com 10% de desconto. Se o valor 
 * da venda for 
 * inferior a R$ 10,00 mostrar todos os dados mas com valor de 
 * desconto de 8%*/
-- ATIVIDADE 10

USE LOJA;

START TRANSACTION;
	DECLARE @CODIGO_VENDA INT;
	DECLARE @DATA_VENDA DATE;
	DECLARE @VALOR_VENDA DOUBLE;

	DECLARE CURSOR_EXERCICIO_10 CURSOR FOR
		SELECT codvenda, dtvenda, vlvenda FROM venda;
	
 	OPEN CURSOR_EXERCICIO_10;
 	
 	FETCH NEXT FROM CURSOR_EXERCICIO_10 INTO 
 		@CODIGO_VENDA, @DATA_VENDA, @VALOR_VENDA;
 	
 	WHILE @@FETCH_STATUS = 0;
 	START;
 		IF @VALOR_VENDA > 10
 			SELECT @CODIGO_VENDA AS CODIGO, @DATA_VENDA AS DATA, @VALOR_VENDA 
 				AS VALOR, @VALOR_VENDA * 0.9 AS REAJUSTE;
 		ELSE
 			SELECT @CODIGO_VENDA AS CODIGO, @DATA_VENDA AS DATA, @VALOR_VENDA AS VALOR
 				@VALOR_VENDA * 0.92 AS REAJUSTE;
 				
 	FETCH NEXT FROM CURSOR_EXERCICIO_10 INTO @CODIGO_VENDA, @DATA_VENDA, @VALOR_VENDA;
END;
CLOSE CURSOR_EXERCICIO_10;
DEALLOCATE CURSOR_EXERCICIO_10;
SELECT * FROM venda;
--    codvenda INT NOT NULL AUTO_INCREMENT,	
--    nnf INT(4) NOT NULL,
--    dtvenda DATE NOT NULL,
--    codcliente INT(4) NOT NULL,
--    codpagamento INT(4) NOT NULL,
--    vlvenda DECIMAL(3,1) NOT NULL,
   

