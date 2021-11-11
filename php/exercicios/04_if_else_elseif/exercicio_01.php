<?php

/*
  Declare uma variável que receba o nome e a idade do usuário,
 * em seguida verifique se o usuário possui ou tenha mais de 18 anos, 
 * caso sim, exiba a seguinte mensagem na tela “Olá [NOME_DO_USUÁRIO], 
 * você pode participar do projeto”, caso tenha menos que 18 anos, 
 * exiba a seguinte mensagem “Olá [NOME_DO_USUÁRIO], você não pode participar do projeto”. 
 * EX:  If(true){echo “valido”}else{ echo “inválido”;}. 
 */

$nome = "Natalia";
$idade = 19;

if ($idade >= 18) {
    echo "Olá <b>{$nome}</b>, você pode participar do projeto";
} else {
    echo "Olá <b>{$nome}</b>, você não pode participar do projeto";
}