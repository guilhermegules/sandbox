<?php
/*
 * Crie uma página que receba o nome e o e-mail de um usuário, passe estes valores para 
 * uma segunda página que deverá imprimir estas informações.
 */
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>GET</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <form method="get" action="exibe.php">
            <label>Nome: <input type="text" name="txtNome" /></label>
            <br/> <br/>
            <label>E-mail: <input type="text" name="txtEmail" /></label>
            <br/> <br/>
            <input type="submit" value="Mostrar" />
        </form>
    </body>
</html>