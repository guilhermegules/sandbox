<?php

$file = fopen("./db-file.csv", "r"); // r - read file

while (!feof($file)) {
  $row = fgets($file, 1024);

  echo "$row <br />";
}

fclose($file);
