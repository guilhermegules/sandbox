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