/* Exercicios de fixação Banco de dados 2 */

/* Atividade 1 */
select * from cidades where cidades.nome like "%via%";

/* Atividade 2 */
SELECT 
    cidades.nome, cidades.populacao, estados.sigla 
FROM 
    cidades
JOIN 
    estados on cidades.estado_id = estados.id
WHERE
    cidades.populacao > 5000 and estados.sigla like "RS"
ORDER BY 
    cidades.populacao asc;

/* Atividade 3 */
SELECT 
    cidades.nome, cidades.gentilico, cidades.populacao, cidades.area
FROM 
    cidades
JOIN 
    estados on cidades.estado_id = estados.id
WHERE 
    estados.sigla like "RS"
ORDER BY 
    cidades.populacao desc
limit 10;

/* Atividade 4 */
SELECT 
    *
FROM 
    cidades
WHERE
    cidades.DENSIDADE_DEMOGRAFICA > 10 and cidades.populacao > 50000
ORDER BY 
    cidades.populacao/cidades.area desc
    
/* Atividade 5 */
SELECT 
    *
FROM 
    cidades
JOIN 
    estados on cidades.estado_id = estados.id
WHERE
    cidades.populacao > 50000 and cidades.populacao/cidades.area between 20 and 30
ORDER BY 
    cidades.populacao/cidades.area desc
    
/* Atividade 6 */
SELECT 
    cidades.nome, cidades.gentilico, cidades.populacao
FROM
    cidades
WHERE 
    cidades.id in (100, 200, 300, 400, 500)
ORDER BY 
    cidades.id asc
    
/* Atividade 7 */
SELECT 
    clientes.nome, clientes.salario, clientes.sexo
FROM 
    clientes
JOIN 
    cidades on clientes.id_cidade = cidades.id
JOIN 
    estados on cidades.estado_id = estados.id
WHERE 
    estados.sigla in ("RS", "SC", "PR") and clientes.salario between 5000 and 7000 and clientes.sexo like "M" and clientes.nascimento between "1990-01-01" and "1999-12-31"
ORDER BY clientes.salario asc

/* Atividade 8 */
SELECT 
    cidades.nome, cidades.gentilico, cidades.populacao, cidades.densidade_demografica, estados.sigla
FROM 
    estados
JOIN
    cidades on cidades.estado_id = estados.id
WHERE
    estados.nome in ("Alagoas", "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piauí", "Rio Grande do Norte", "Sergipe")
ORDER BY
    estados.nome, cidades.nome

/* Atividade 9 */
SELECT 
    cidades.nome, cidades.gentilico, cidades.populacao, cidades.densidade_demografica, estados.sigla
FROM
    cidades
JOIN 
    estados on cidades.estado_id = estados.id
WHERE 
    estados.nome not in ("Alagoas", "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piauí", "Rio Grande do Norte", "Sergipe")
ORDER BY 
     estados.nome, cidades.nome

/* Atividade 10 */
SELECT 
    clientes.nome, clientes.sexo, estados.sigla
FROM
    clientes
JOIN 
    cidades on clientes.cidade_id = cidades.id
JOIN
    estados on cidades.id_estado = estados.id
WHERE 
    clientes.sexo like "F" and estados.nome in ("Alagoas", "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piauí", "Rio Grande do Norte", "Sergipe")
ORDER BY 
    estados.sigla, clientes.nome

/* Atividade 11 */
SELECT 
    clientes.nome, clientes.sexo, clientes.salario, DATE_FORMAT(clientes.nascimento, "%d/%m/%Y") as Data_de_nascimento, TIMESTATMPDIFF(YEAR, nascimento, CURDATE()) as idade  
FROM 
    clientes
JOIN 
    cidades on clientes.id_cidade = cidades.id
JOIN 
    estados on cidades.estado_id = estados.id
WHERE
    estado.sigla like "RS"
    
/* Atividade 12 */
SELECT 
    clientes.nome, clientes.sexo, clientes.salario, clientes.nascimento, clientes.salario*0.12 as imposto_medio
FROM 
    clientes
JOIN 
    cidades on clientes.id_cidade = cidades.id
JOIN
    estados on cidades.estado_id = estados.id
WHERE 
    estados.sigla like "RJ"
ORDER BY 
    clientes.nome

/* Atividade 13 */
SELECT 
    estados.sigla, count(cidades.id) as cidades
FROM
    estados
JOIN 
    cidades on estados.id = cidades.estado_id
WHERE 
    estados.sigla in ("AM", "RR", "AP", "PA", "TO", "RO", "AC")
GROUP BY
    estados.sigla

/* Atividade 14 */
SELECT
    estados.sigla, sum(cidades.populacao) as total_habitantes, sum(cidades.area) as area_total
FROM 
    estados
JOIN
    cidades on estados.id = cidades.estado_id
WHERE 
    estados.sigla in ("AM", "RR", "AP", "PA", "TO", "RO", "AC")
GROUP BY 
    estados.sigla

/* Atividade 15 */
SELECT 
    estados.sigla, count(cidades.id) as total_cidades
FROM 
    estados
JOIN 
    cidades on estados.id = cidades.estado_id
GROUP BY 
    estados.sigla
HAVING
    count(cidades.id) > 100
ORDER BY
    estados.sigla
    
/* Atividade 16 */
INSERT INTO clientes
    (10001, "BRUNO CRISTIAN DA SILVA", "M", "1999-06-01", 10000, 2447),
    (10002, "LUCAS SANTOS MACHADO", "M", "1998-09-23", 25000, 2447),
    (10003, "MAICON RODRIGUES", "M", "1997-01-01", 45000, 2447),
    (10004, "ALINE ZENKER", "F", "1975-04-04", 100000, 2447)
    
/* Atividade 17 */
SELECT 
    cidades.populacao
FROM
    cidades
WHERE 
    cidades.nome like "Porto Alegre"
    
/* Atividade 18 */
DELETE 
    FROM clientes
        WHERE clientes.id=666

UPDATE pessoas
    SET (salario = 2000)
        WHERE id = 2; 

INSERT INTO pessoas
    VALUES (null, "Luisa", "F", 2500);
