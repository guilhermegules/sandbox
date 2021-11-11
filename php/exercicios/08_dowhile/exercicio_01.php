<?php

/*
 * Crie um algoritmo utilizando o dowhile que exiba na tela uma única vez o índice atual do laço de repetição. 
 * O loop começa de 0 e vai até 5.
 */

$index = 1;
$mostrou = false;

do {
    if (!$mostrou) {
        echo $index;
        $mostrou = !$mostrou;
    }
    $index++;
} while ($index < 6);
?>