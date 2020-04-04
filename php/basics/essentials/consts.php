<?php

define("min", 17);
define("max", 45);

$idade = 25;

echo "Min " . min . "<br>";
echo "Max " . max . "<br>";
echo "Idade " . $idade . "<br>";

if($idade >= min && $idade <= max) {
  echo "Acesso liberado...";
} else {
  echo "Acesso bloqueado!";
}

echo "<br>php version " . PHP_VERSION; //constante da linguagem