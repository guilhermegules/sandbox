#!/bin/bash

echo "Digite o nome do grupo para pesquisa"

read group

cat /etc/group |grep $group
