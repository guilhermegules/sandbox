<?php

require('./database/Connection.php');

$connection = new Connection("193.123.108.138", "iae", "iae", "iae");

$name = $_GET["nome_usuario"];
$cellphone = $_GET["telefone"];
$address = $_GET["endereco_usuario"];

$sql = "INSERT INTO pessoa (nome, telefone, endereco) VALUES ('$name', '$cellphone', '$address')";

// $sqlDelete = "DELETE FROM pessoa WHERE id = 25";
// $sqlSelect = "SELECT FROM pessoa WHERE name = '$name' AND endereco IS NULL";
$sqlUpdate = "UPDATE pessoa SET 
  nome='$name', 
  telefone ='$cellphone',
  endereco='$address' 
  WHERE id = '1'";

if ($connection->getConnection()->query($sql)) {
  echo "Save successfully";
} else {
  echo "Error: $sql <br/> $connection->error";
}
