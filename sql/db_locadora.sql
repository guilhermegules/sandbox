### CREATE DATA BASE

DROP DATABASE if exists db_locadora;

CREATE DATABASE db_locadora;

USE db_locadora;
### CREATE TABLES

CREATE TABLE tbl_clientes(
ID_cliente SMALLINT AUTO_INCREMENT PRIMARY KEY,
nome_cliente VARCHAR(40) NOT NULL,
cidade_cliente VARCHAR(40) NOT NULL,
bairro_cliente VARCHAR(40) NOT NULL,
rua_cliente VARCHAR(40) NOT NULL,
numero INT,
data_nascimento DATE NOT NULL,
data_cadastro DATE NOT NULL
);

CREATE TABLE tbl_protagonistas(
ID_protagonista SMALLINT AUTO_INCREMENT PRIMARY KEY,
nome_protagonista VARCHAR(60) NOT NULL
);

CREATE TABLE tbl_generos(
ID_genero SMALLINT AUTO_INCREMENT PRIMARY KEY,
genero VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_relatorio(
ID_relatorio SMALLINT AUTO_INCREMENT PRIMARY KEY,
acao VARCHAR(15), ##INSERT, UPDATE & DELETE
descricao VARCHAR(100), ##Nome da coluna principal(titulo_filme,
##nome_cliente, genero, nome_protagonista)
data_evento date,
usuario varchar(60) not null
);

CREATE TABLE tbl_filmes(
ID_filme SMALLINT AUTO_INCREMENT PRIMARY KEY,
titulo_filme VARCHAR(40) NOT NULL,
data_lancamento DATE NOT NULL,
preco_locacao DECIMAL(10,2) NOT NULL,
preco_desconto DECIMAL(10,2),
ID_protagonista SMALLINT,
ID_genero SMALLINT,
FOREIGN KEY(ID_protagonista) REFERENCES tbl_protagonistas(ID_protagonista),
FOREIGN KEY(ID_genero) REFERENCES tbl_generos(ID_genero)
);
CREATE TABLE tbl_funcionarios(
codigo_funcionario SMALLINT AUTO_INCREMENT PRIMARY KEY,
cidade_funcionario VARCHAR(40) NOT NULL,
bairro_funcionario VARCHAR(40) NOT NULL,
rua_funcionario VARCHAR(40) NOT NULL,
numero INT not null
);
CREATE TABLE tbl_locacao(
ID_locacao SMALLINT AUTO_INCREMENT PRIMARY KEY,
codigo_filme SMALLINT,
codigo_cliente SMALLINT,
codigo_funcionario SMALLINT not null,
data_locacao DATE,
FOREIGN KEY (codigo_funcionario) REFERENCES tbl_funcionarios(codigo_funcionario),
FOREIGN KEY (codigo_filme) REFERENCES tbl_filmes(ID_filme),
FOREIGN KEY (codigo_cliente) REFERENCES tbl_clientes(ID_cliente)
);

###INSERT INTO tbl_atores
select * from tbl_protagonistas;
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Al Pacino');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Judy Garland');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Morgan Freeman');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Humphrey Bogart');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Robert Duvall');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Ben Kingsley');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Harrison Ford');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Michael J. Fox');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Vivien Leigh');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Jodie Foster');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('William H. Macy');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Kevin Spacey');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Laurence Fishburne');
INSERT INTO tbl_protagonistas(nome_protagonista) VALUES ('Leonardo DiCaprio');



###INSERT INTO tbl_generos
INSERT INTO tbl_generos(genero) VALUES ('Musical');
INSERT INTO tbl_generos(genero) VALUES ('Drama');
INSERT INTO tbl_generos(genero) VALUES ('Biografia');
INSERT INTO tbl_generos(genero) VALUES ('Ficcão Científica');
INSERT INTO tbl_generos(genero) VALUES ('Comédia');
INSERT INTO tbl_generos(genero) VALUES ('Aventura');
INSERT INTO tbl_generos(genero) VALUES ('Romance');
INSERT INTO tbl_generos(genero) VALUES ('Suspense');

select * from tbl_generos;

###INSERT INTO tbl_clientes
select * from tbl_clientes;
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Machado de Assis','Porto Alegre','Petropolis','Das Camélias',76,'18390721','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Carlos Drummond de Andrade','Canoas','Navegantes','Carlos Gomes',55,'19021031','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Clarice Lispector','Novo Hamburgo','Lomba do Pinheiro','Ucrânia',12,'19201210','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Jorge Amado','Porto Alegre','Humaita','Buenos Aires',25,'19120810','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Guimarães Rosa','Alvorada','Centro','Uruguaiana',11,'19080627','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Paulo Coelho','São Leopoldo','Salgado Filho','São Pedro',10,'19470824','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Castro Alves','Canoas','Centro','Manuel Xavier',320,'18470314','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Gracilliamo Ramos','Canoas','Menino Deus','Marista',530,'18921027','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('José de Alencar','Porto Alegre','Petropolis','Buenos Aires',49,'18771212','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Cecília Meireles','Novo Hamburgo','Navegantes','Chapeco',125,'19011107','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Oswald de Andrade','São Leopoldo','Partenon','Brasilia',2,'18900111','20141125');
INSERT INTO tbl_clientes(nome_cliente,cidade_cliente,bairro_cliente,rua_cliente,numero,data_nascimento,data_cadastro)
VALUES ('Mário Quintana','Porto Alegre','Floresta','Felipe da Cunha',4,'19060730','20141125');

######INSERT INTO tbl_filmes

select * from tbl_filmes;
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('O Poderoso Chefão','19721025',8.00,1,1);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('O Mágico de Oz','19391025',4.50,2,2);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Um Sonho de Liberdade','19941025',3.00,3,1);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Casablanca','19421025',10.00,4,1);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('O Poderoso Chefão 2','19741025',9.00,5,1);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('A Lista de Schindler','19931025',4.00,6,3);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Guerra nas Estrelas','19771025',5.50,7,4);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('De Volta para o Futuro','19851025',6.00,8,5);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Os Caçadores da Arca Perdida','19811025',7.00,7,6);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('E o Vento Levou','19391025',7.50,9,7);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('O Silêncio dos Inocentes','19911025',3.00,10,8);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Fargo','19961025',9.00,11,1);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Beleza Americana','19991025',3.50,12,1);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Matrix','19991025',4.00,13,4);
INSERT INTO tbl_filmes(titulo_filme,data_lancamento,preco_locacao,ID_protagonista,ID_genero)
VALUES ('Titanic','19971025',3.50,14,7);


#####INSERT INTO tbl_funcionarios
INSERT INTO tbl_funcionarios(cidade_funcionario,bairro_funcionario,rua_funcionario,numero)
VALUES ('Gravataí','Centro','Das Camélias',14);
INSERT INTO tbl_funcionarios(cidade_funcionario,bairro_funcionario,rua_funcionario,numero)
VALUES ('Porto Alegre','Petropolis','Marista',343);
INSERT INTO tbl_funcionarios(cidade_funcionario,bairro_funcionario,rua_funcionario,numero)
VALUES ('Caxias do Sul','São Pelegrino','Senhor dos Passos',104);


#####INSERT INTO tbl_locacao
select * from tbl_locacao;
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (10,3,1,'20141125');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (12,1,1,'20141126');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (4,4,2,'20141127');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (6,7,2,'20141225');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (3,3,3,'20141025');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (13,3,3,'20141101');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (5,6,1,'20141215');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (5,7,3,'20141125');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (4,5,1,'20141126');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (3,4,1,'20141127');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (7,3,3,'20141225');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (6,2,3,'20141025');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (10,1,2,'20141101');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (11,8,2,'20141215');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (12,7,1,'20141125');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (13,6,2,'20141126');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (3,5,3,'20141127');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (4,4,1,'20141225');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (5,3,2,'20141025');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (6,2,1,'20140801');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (7,1,3,'20141215');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (9,3,3,'20140825');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (7,2,2,'20141126');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (8,1,2,'20141127');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (6,4,1,'20141225');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (9,3,3,'20141025');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (9,5,2,'20141101');
INSERT INTO tbl_locacao(codigo_filme,codigo_cliente,codigo_funcionario,data_locacao) VALUES (7,4,1,'20140815');

-- Atividades de seleção
select count(ID_filme) from tbl_filmes;
select sum(ID_filme) from tbl_filmes;

select * from tbl_clientes where numero between 50 and 200;
select nome_cliente as Cliente, substr(data_nascimento, 6, 2) as 'mes de nascimento' from tbl_clientes;
select nome_cliente as Cliente, month(data_nascimento) as 'mes de nascimento' from tbl_clientes;
select nome_cliente from tbl_clientes where substr(data_nascimento, 6, 2) = substr(curdate(), 6, 2); 
select * from tbl_clientes where length(nome_cliente) > 15;
select nome_cliente, datediff(curdate(), data_nascimento) as idade from tbl_clientes;
select nome_cliente as 'Nome Cliente', floor(datediff(curdate(),data_nascimento)/365) as Idade from tbl_clientes;
select nome_cliente from tbl_clientes where nome_cliente like "%de%";
select nome_cliente from tbl_clientes where nome_cliente like "c%";
select nome_cliente from tbl_clientes where nome_cliente like "_o%";

select ID_genero, count(ID_genero) as 'quantidade', sum(preco_locacao) as 'total' 
	from tbl_filmes 
		group by ID_genero;
        
select ID_genero, count(ID_genero) as 'quantidade', sum(preco_locacao) as 'total' 
	from tbl_filmes
		group by ID_genero
			having count(ID_genero) > 5;
            

select ID_genero, count(ID_genero) as 'quantidade', sum(preco_locacao) as 'total' 
	from tbl_filmes
		group by ID_genero
			having total > 10;

select titulo_filme from tbl_filmes
	where id_genero
		in 
			(select id_genero from tbl_generos where genero = 'Romance');
            
select count(*) from tbl_locacao
	where codigo_filme
		in
			(select id_filme from tbl_filmes where titulo_filme = 'Casablanca');
            
select data_locacao from tbl_locacao
	where codigo_filme
		in 
			(select id_filme from tbl_filmes where titulo_filme = 'Fargo');
            
select data_locacao, data_lancamento from tbl_locacao
	inner join tbl_filmes
		on tbl_locacao.codigo_filme = tbl_filmes.ID_filme
			where titulo_filme = 'Casablanca';
            
-- Atividades 
-- Listar quantidade de filmes que tem como protagonista 'Morgan Freeman'
select count(id_filme) from tbl_filmes
	inner join tbl_protagonistas
		on tbl_filmes.ID_protagonista = tbl_protagonistas.ID_protagonista
			where tbl_protagonistas.nome_protagonista = 'Morgan Freeman';
            
-- Listar todos os clientes que moram em Canoas e que locaram filmes no mes de abril
select tbl_clientes.nome_cliente from tbl_clientes
	inner join tbl_locacao
		on tbl_locacao.codigo_cliente = tbl_clientes.ID_cliente
			where tbl_clientes.cidade_cliente = 'Canoas'
				order by tbl_clientes.ID_cliente;
            
-- listar todos os filmes com os seus protagonistas
select tbl_filmes.titulo_filme as titulo, tbl_protagonistas.nome_protagonista as protagonista from tbl_filmes
	inner join tbl_protagonistas
		on tbl_filmes.ID_protagonista = tbl_protagonistas.ID_protagonista
			order by tbl_filmes.ID_filme;
            
-- Encontrar as locações do bairro petropolis OBS: tbl_clientes tbl_locacao
-- nome do cliente que alugou
select tbl_clientes.nome_cliente from tbl_locacao
	inner join tbl_clientes
		on tbl_locacao.codigo_cliente = tbl_clientes.ID_cliente
			where tbl_clientes.bairro_cliente = 'Petropolis';
            
-- número de alugueis
select count(tbl_locacao.ID_locacao) from tbl_locacao
	inner join tbl_clientes
		on tbl_locacao.codigo_cliente = tbl_clientes.ID_cliente
			where tbl_clientes.bairro_cliente = 'Petropolis';
            
-- listar todos os clientes fizeram locações de filmes dos gêneros 'comédia'
select * from tbl_clientes
	inner join tbl_locacao
		on tbl_locacao.codigo_cliente = tbl_clientes.ID_cliente
			inner join tbl_filmes
				on tbl_locacao.codigo_filme = tbl_filmes.ID_filme
					inner join tbl_generos
						on tbl_filmes.ID_genero = tbl_generos.ID_genero
							where tbl_generos.genero = "comédia";
			

-- listar o cliente que mais locou filmes do genero de aventura
select * from tbl_clientes
	inner join tbl_locacao
		on tbl_locacao.codigo_filme = tbl_clientes.ID_cliente
			inner join tbl_filmes
				on tbl_locacao.codigo_filme = tbl_filmes.ID_filme
					inner join tbl_generos
						on tbl_filmes.ID_genero = tbl_generos.ID_genero
							where tbl_generos.genero = "aventura";


-- listar todos os titulos dos filmes que não tiveram locação
select tbl_filmes.titulo_filme from tbl_filmes
	where not exists (
		select 1
			from tbl_locacao
				where tbl_locacao.codigo_filme = tbl_filmes.ID_filme
	);