#!/bin/bash

while read linha 
   do
      echo "Site ="$linha
      ping -c1 $linha &>/dev/null && echo " OK " || echo " NO "
      echo "#######################################" >> relatorio.txt
      sleep 1
done < sites.txt
