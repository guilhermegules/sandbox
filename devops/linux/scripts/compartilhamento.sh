#!/bin/bash

echo "Digite o nome do diretorio"

echo "O diretorio sera compartilhado no seu home"

read nome

sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.$nome

echo "Iniciando o compartilhamento "$nome

echo "Digite os comentarios "

read comentarios

echo "compartilhamento oculto? [1]Sim [2]Nao"

read op

if [ $op -eq 1 ]
then
     oculto="browseable = no"
else
     oculto="browseable = yes"
fi

echo "possibilitar alterecao? [1]Sim [2]Nao"

read op2

if [ $op2 -eq 1 ]
then
      alterar="writeable = yes"
else
      alterar="writeable = no"
fi

samba="/etc/samba/smb.conf"

cd ~/$nome

caminho=$( pwd )

echo "["$nome"]" >> $samba

echo "coment = "$comentarios >> $samba

echo "path = "$caminho"/"$nome >> $samba

echo "guest ok = yes" >> $samba

echo $oculto >> $samba

echo $alterar >> $samba

cat $samba

/etc/init.d/samba restart

