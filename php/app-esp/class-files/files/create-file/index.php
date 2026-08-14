<?php

$file = fopen("./file.txt", "a"); // w - write file | a - append file

fputs($file, "Minha primeira escrita\n");
fputs($file, "Minha segunda escrita\n");
fputs($file, "Minha Terceira escrita\n");

fclose($file);
