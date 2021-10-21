<?php 

$host = "193.123.108.138";
$user = "iae";
$pass = "iae";
$database = "iae";

$connection = new mysqli($host, $user, $pass, $database);
$connection->set_charset("utf8mb4");

if ($connection->connect_error) {
  die("Error in connect with Database, $connection->connect_error");
}