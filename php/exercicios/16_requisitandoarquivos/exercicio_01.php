<?php

/*
 * Crie um arquivo chamado de functions.php, nele escreva quatro funções que calcule as operações básicas, 
 * na sequencia utilizando uma página principal, chame este arquivo e exiba o resultado de cada uma das 
 * funções passando alguns valores.
 */

require_once("functions.php");

echo "Soma: " . Soma(1, 1) . "<br>";

echo "Subtração: " . Subtracao(10, 5) . "<br>";

echo "Multiplicação: " . Multiplicacao(30, 7.5) . "<br>";

echo "Disivão: " . Divisao(30, 2.5) . "<br>";
?>
