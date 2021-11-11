<?php

/* 
 * Crie uma função que receba um array por parâmetro e exiba os valores na tela.
 */

$arr = ["Camelo", "Girafa", "Leão", "Elefante", "Onça"];

function Animais($arr){
    for($i = 0; $i < 5; $i++){
        echo "{$arr[$i]} <br />";
    }
}

Animais($arr);

?>