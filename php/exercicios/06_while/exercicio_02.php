<?php

/*
 * Declare uma variável chama de indice começando de 0. Dentro da estrutura while, 
 * utilizando o if verifique se o valor é igual a 12, caso seja, exiba a mensagem 
 * “Número válido”. A cada repetição do while incremente 1 a variável índice, 
 * para a saída a variável indice deve ser menor que 15.
 */

$indice = 0;

while ($indice <= 15) {
    if ($indice == 12) {
        echo "Número válido, posição {$indice}";
    }
    $indice++;
}