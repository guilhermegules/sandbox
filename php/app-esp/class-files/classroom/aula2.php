<?php

// Constant
define("NOME", "VALOR CONSTANTE");

echo "Minha constante " . NOME;

echo "<br/>";

$text = "Hoje vai chover";

$text .= " muito";

echo $text;

// Logical operators
echo "<br>";
echo 1 == 1;
echo "<br>";
echo 1 != 1;
echo "<br>";
echo 0 || 1;
echo "<br>";
echo 1 === 1;
echo "<br>";
echo 1 && 1;

function sum($a, $b) {
  return $a + $b;
}

echo "<br/>";
echo "Resultado: " .  sum(1, 2);
