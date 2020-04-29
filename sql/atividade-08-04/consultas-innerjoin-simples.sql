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