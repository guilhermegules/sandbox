<?php

/*
  Declare uma variável responsável por armazenar o dia da semana,
 * começando de 1 (segunda) até 7 (domingo), por exemplo, 3 que corresponde a quarta. 
 * Verifique qual o valor da variável e exiba o dia por extenso na tela com base no valor da variável.
 */

$dia = 5;

switch ($dia) {
    case 1:
        echo "Segunda-Feira";
        break;
    case 2:
        echo "Terça-Feira";
        break;
    case 3:
        echo "Quarta-Feira";
        break;
    case 4:
        echo "Quinta-Feira";
        break;
    case 5:
        echo "Sexta-Feira";
        break;
    case 6:
        echo "Sábado";
        break;
    case 7:
        echo "Domingo";
        break;
}
