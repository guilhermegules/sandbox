<?php

/* 
 * Declare uma variável com o seu nome, e utilizando o explode, exiba a mensagem 
 * “Olá, {SEU_NOME}, porém apenas para o primeiro nome.
 */

$strNome = "Gunnar Correa";
$ex = explode(" ", $strNome);

echo "Olá, <span style='font-weight: bold; color: blue;'>{$ex[0]}</span>!";