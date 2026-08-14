\SELECT Veiculo.placa, Cliente.nome from Veiculo
	INNER JOIN Cliente
		ON Veiculo.Cliente_cpf = Cliente.cpf;
	
SELECT Cliente.cpf AS CPF, Cliente.nome AS nome FROM Cliente
	LEFT JOIN Veiculo
		ON Cliente.cpf = Veiculo.cliente_cpf
			WHERE Veiculo.placa = "jjj-2020";
		
SELECT Veiculo.placa AS Placa, Veiculo.cor AS Cor FROM Veiculo
	LEFT JOIN Estaciona
		ON Veiculo.placa = Estaciona.Veiculo_placa
			WHERE Estaciona.cod = 1;
		
SELECT Veiculo.placa AS Placa, Veiculo.ano AS Ano FROM Veiculo
	INNER JOIN Estaciona
		ON Veiculo.placa = Estaciona.Veiculo_placa
			Where Estaciona.cod = 1;
				
SELECT Veiculo.placa AS Placa, Veiculo.ano AS Ano, Modelo.Desc_2 AS "Descrição" FROM Veiculo
	INNER JOIN Modelo
		ON Veiculo.Modelo.codMod = Modelo.codMod
			WHERE Veiculo.ano > 2000;
	
SELECT Patio.ender AS "Endereço", Estaciona.dtEntrada AS "Data de entrega", Estaciona.dtSaida AS "Data de saída" 
	FROM Patio
		INNER JOIN Estaciona
		ON Patio.num = Estaciona.Patio_num
		INNER JOIN Veiculo
		ON Estaciona.Veiculo_placa = Veiculo.placa
			WHERE Veiculo.placa = "JEG-1010";
			
SELECT COUNT(Veiculo.id) AS "Quantidade de vezes estacionado" FROM Veiculo
	INNER JOIN Estaciona
		ON Estaciona.Veiculo_placa = Veiculo.placa
			WHERE Veiculo.cor = "verde";
		
SELECT * FROM Cliente
	INNER JOIN Veiculo
		ON Veiculo.Cliente_cpf = Cliente.cpf
			INNER JOIN Modelo
				ON Modelo.codMod = Veiculo.Modelo_codMod
					WHERE Modelo.codMod = 1;
	
SELECT * FROM Estaciona
	INNER JOIN Veiculo
		ON Veiculo.placa = Estaciona.Veiculo_placa
			WHERE Veiculo.placa = "jjj-2020";

SELECT Cliente.nome AS Nome FROM Cliente
	INNER JOIN Veiculo
		ON Veiculo.Cliente_cpf = Cliente.cpf
			INNER JOIN Estaciona
				ON Veiculo.placa = Estaciona.Veiculo_placa
					WHERE Estaciona.cod = 2;

SELECT Cliente.nome AS Nome, Cliente.cpf AS CPF FROM Cliente
	INNER JOIN Veiculo
		ON Veiculo.Cliente_cpf = Cliente.cpf
			INNER JOIN Estaciona
				ON Veiculo.placa = Estaciona.Veiculo_placa
					WHERE Estaciona.cod = 3;	
	
SELECT Modelo.Desc_2 AS "Descrição" From Modelo
	INNER JOIN Veiculo
		ON Veiculo.Modelo_codMod = Modelo.codMod
			INNER JOIN Estaciona
				ON Estaciona.Veiculo_placa = Veiculo.placa
					WHERE Estaciona.cod = 2;
				
SELECT Veiculo.placa AS Placa, Cliente.nome AS Dono, Modelo.Desc_2 FROM Veiculo
	INNER JOIN Cliente
		ON Cliente.cpf = Veiculo.Cliente_cpf
			INNER JOIN Modelo
				ON Modelo.codMod = Veiculo.Modelo_codMod;




