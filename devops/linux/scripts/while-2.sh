#!/bin/bash

while read linha 
   do
      echo "Site ="$linha >> relatorio.txt
      ping -c1 $linha >> relatorio.txt
      echo "#######################################" >> relatorio.txt
      #sleep 1
done < sites.txt
