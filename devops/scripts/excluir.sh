#!/bin/bash

echo "Digite o nome do diretorio para ser excluido: "

read nome

caminho=$( pwd )

sed -i '/lllll/,+6d' $nome

echo "Exclusao concluida"
