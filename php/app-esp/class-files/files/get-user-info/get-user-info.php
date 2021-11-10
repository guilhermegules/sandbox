<?php

require("../connection.php");

$file = fopen("./file.csv", "w");

$sql = "SELECT * FROM acesso";

$result = $connection->query($sql);

if ($result->num_rows > 0) {
  echo "<b>Dados do relatório:</b><br/>";
  while ($column = $result->fetch_assoc()) {
    $accessInfo = "$column[nome];$column[id];$column[email];\n";

    fputs($file, $accessInfo);

    echo "$accessInfo <br/>";
  }
}

echo "Você pode baixar o relátorio aqui: <a id='report' href='./file.csv' download='relatorio.csv'>Baixar</a>";

fclose($file);
