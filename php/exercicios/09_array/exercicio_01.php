<?php
/*
 * Crie um array e insira o nome de seis frutas, exiba o nome de cada uma delas dentro de um elemento <option>, 
 * filho do elemento <select>.
 */

$arr = ["Abacate", "Groselha", "Jatobá", "Laranja", "Tangerina", "Uva"];
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Frutas array</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <select>
            <?php
            for ($i = 0; $i < 6; $i++) {
                ?>
                <option><?= $arr[$i] ?></option>
                <?php
            }
            ?>
        </select>
    </body>
</html>