<?php

$host = "193.123.108.138";
$user = "iae";
$pass = "iae";
$database = "iae";

$connection = new mysqli($host, $user, $pass, $database);

echo "<pre>";
print_r($connection);
echo "</pre>";

if ($connection->connect_error) {
  die("Error in connect with Database, $connection->connect_error");
}

echo "Connected <br />";

$name = $_GET["name"];
$cellphone = $_GET["cellphone"];
$address = $_GET["address"];

$sql = "INSERT INTO pessoa (nome, telefone, endereco) VALUES ($name, $cellphone, $address)";

if ($connection->query($sql)) {
  echo "Save successfully";
} else {
  echo "Error: $sql <br/> $connection->error";
}
