#!/bin/bash

x=1
while [ $x -le 5 ]
  do
    data=$(date +'%Y%m%d%H%M%S')
    cp data.sh data.sh.$data
    sleep 3
    x=$(( $x + 1 ))
done
