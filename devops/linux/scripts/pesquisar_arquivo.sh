#!/bin/bash

echo "Digite o nome do arquivo para pesquisa"

read nome

ls -l |grep $nome
