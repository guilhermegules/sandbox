<?php

  require("./connection.php");

  $sql = "SELECT * FROM pessoa";

  $result = $connection->query($sql);

  // mysqli result object
  // echo "<pre>";
  // print_r($result);
  // echo "</pre>";

  if($result->num_rows > 0) {
    while($column = $result->fetch_assoc()) {
      echo "<br/>$column[id] - $column[nome] - $column[telefone] - $column[endereco]";
    }
  } else {
    header("Location: teste.php");
    die();
  }