<?php
/*
 * Crie um array com alguns nomes e utilizando o foreach exiba cada nome dentro de um elemento <li>, 
 * filho do elemento <ul>.
 */

$arr = array(
    1 => "Acabate",
    2 => "Banana",
    3 => "Goiaba",
    4 => "Manga",
    5 => "Morango",
    6 => "Uva"
);
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Frutas array</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <select name="slFrutas" id="slFrutas">
            <?php
            foreach ($arr as $key => $v) {
                ?>
                <option value="<?=$key;?>"><?= $v; ?></option>
                <?php
            }
            ?>
        </select>
    </body>
</html>