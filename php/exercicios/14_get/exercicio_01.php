<?php
/*
 * Crie uma página que receba pela URL uma Query String com o nome de msg e o
 *  valor podendo ser 1 ou 2, para cada valor, exiba as mensagens abaixo dentro de elemento <p>.
 *  Valor 1: Sua sessão expirou, faça o login novamente.
 *  Valor 2: Você não possui permissão para acessar.
 */
$query = filter_input(INPUT_GET, "msg", FILTER_SANITIZE_NUMBER_INT);
$msg = "&nbsp;";
//&nbsp; = Entidade HTML que representa o caractere espaço (space key).
switch ($query) {
    case 1:
        $msg = "Sua sessão expirou, faça o login novamente";
        break;

    case 2:
        $msg = "Você não possui permissão para acessar";
        break;
}
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>GET</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <p><?= $msg; ?></p>
        <br />
        <a href="?msg=1">MSG 1</a> | <a href="?msg=2">MSG 2</a> | <a href="exercicio_01.php">Padrão</a> 
    </body>
</html>