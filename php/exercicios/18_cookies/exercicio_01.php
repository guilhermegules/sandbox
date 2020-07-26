<?php
/*
 * Cria uma página que solicite o nome do usuário, se o nome tiver 5 ou mais caracteres, 
 * guarde em um Cookie e exiba em uma outra página. 
 */

$msg = "";


if (filter_input(INPUT_POST, "btnGravar", FILTER_SANITIZE_STRING)) {
    if (strlen(filter_input(INPUT_POST, "txtNome", FILTER_SANITIZE_STRING)) >= 5) {
        setcookie("nome", filter_input(INPUT_POST, "txtNome", FILTER_SANITIZE_STRING));
        header("Location: ler.php");
    } else {
        $msg = "<span style='color: red;'>Nome inválido. (min. 5 caracteres)</span>";
    }
}
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Cookie</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <form method="POST">
            <label>Nome: <input type="text" name="txtNome" /></label>
            <br/> <br/>
            <input type="submit" name="btnGravar" value="Gravar" />
        </form>
        <br />
        <p><?= $msg; ?></p>
    </body>
</html>