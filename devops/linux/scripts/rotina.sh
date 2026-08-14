#!/bin/bash

echo "Administracao de usuarios e grupos"
echo "[1] CRIAR USUARIO"
echo "[2] TROCAR SENHA DO USUARIO"
echo "[3] CRIAR GRUPO"
echo "[4] HABILITAR SAMBA PARA USUARIO"
echo "[5] SAIR"

read opcao

if [ $opcao -eq 1 ]
	then
		./usuario.sh
elif [ $opcao -eq 2 ]
	then
		./trocasenha.sh
elif [ $opcao -eq 3 ]
	then
		./grupo.sh
elif [ $opcao -eq 4 ]
	then
		./samba.sh
else
	echo "Programa encerrado"
fi
