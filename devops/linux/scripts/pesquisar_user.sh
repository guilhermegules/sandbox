#!/bin/bash

echo "Digite o nome do usuario para pesquisa"

read user

cat /etc/passwd |grep $user
