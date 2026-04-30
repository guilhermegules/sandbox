#!/bin/bash

x="1"
while [ $x -lt 5 ]
  do
    echo " Valor de X" $x
    x=$(( $x + 1 ))
done
