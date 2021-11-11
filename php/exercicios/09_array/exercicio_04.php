<?php

/* 
 * Utilizando o array criado no exercício anterior, exiba os valores começando da última posição até a primeira.  
 */

$arr = ["Mouse", "Teclado", "Monitor", "Gabinete", "Estabilizador", "Caixa de som"];

for($i = 5; $i >= 0; $i--){
    echo $arr[$i] . "<br />";
}
?>