<?php

require("../connection.php");

function importFile(string $filename, $connection)
{
  $file = fopen($filename, "r");

  while (!feof($file)) {
    $row = fgets($file);

    $row = explode(";", $row);
  }

  $sql = "INSERT INTO importacao (nome, acesso_id, email) VALUES (";

  foreach ($row as $key => $value) {
    if (array_key_last($row) === $key) {
      $sql .= "'$value'";
      break;
    }

    $sql .= "'$value',";
  }

  $sql .= ")";

  echo $sql;

  if ($connection->query($sql)) {
    echo "Save successfully";
  }

  fclose($file);
}

importFile("./access.csv", $connection);
