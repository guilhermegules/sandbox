<?php

/*
  Declare uma variável que receba o salário de um funcionário e outra para receber
  o valor do reajuste, na sequencia faça o reajuste conforme mostrado a seguir:
  - Se o funcionário ganha menos de R$ 1200.00, faça o reajuste de R$ 300,00.
  - Se o funcionário ganha mais de R$ 1200.00 e menos de 1600.00, faça o reajuste de R$ 250,00.
  - Se o funcionário recebe mais de R$ 1600.00, faça o reajuste de R$ 200,00.
 */

$salario = 1867.15;
$reajuste;

if ($salario <= 1200) {
    $reajuste = $salario + 300;
} elseif ($salario > 1200 && $salario <= 1600) {
    $reajuste = $salario + 250;
} else {
    $reajuste = $salario + 200;
}

echo "Seu novo salário com o reajuste é de <b>R$ {$reajuste}</b>";