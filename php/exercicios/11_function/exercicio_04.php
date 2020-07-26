<?php
/*
 * Crie uma função para fazer o reajuste de um salário que é recebido por parâmetro, 
 * para o reajuste utilize o valor de entrada + 5%. Retorne este valor a uma variável 
 * e exiba o seu resultado dentro de um elemento <h1>.
 */

function Reajuste($salario) {
    return ($salario + (($salario / 100) * 5));
}

$salario = Reajuste(1000);
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Reajuste</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <h1><?= $salario; ?></h1>
    </body>
</html>