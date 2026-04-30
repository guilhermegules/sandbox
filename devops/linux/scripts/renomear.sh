#!/bin/bash

echo "Digite o nome do arquivo ou diretorio"
read pathOrFile

echo "Novo nome do arquivo"
read newName

mv $pathOrFile $newName

