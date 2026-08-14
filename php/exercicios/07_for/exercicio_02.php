<?php
/*
 * Utilizando o for dentro de um elemento <ul> do HTML, crie uma repetição que vai de 0 a 20, 
 * para cada repetição crie um elemento <li> que exiba o valor do índice atual multiplicado por 30.
 */
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Repetição FOR 2</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <ul>
            <?php
            for ($i = 0; $i <= 20; $i++) {
                ?>
                <li><?= ($i * 30); ?></li>
                <?php
            }
            ?>
        </ul>
    </body>
</html>