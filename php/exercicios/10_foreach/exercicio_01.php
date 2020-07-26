<?php
/*
 * Crie um array com alguns nomes e utilizando o foreach exiba cada nome dentro de um elemento <li>, 
 * filho do elemento <ul>.
 */

$arr = array("Amanda", "Thiago", "Bruno", "Isaque", "Guilherme", "Jéssica");
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Frutas array</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <ul>
            <?php
            foreach ($arr as $v) {
                ?>
                <li><?= $v; ?></li>
                <?php
            }
            ?>
        </ul>
    </body>
</html>