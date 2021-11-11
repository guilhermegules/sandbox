<?php
function connection() {
  $connection = new PDO("mysql:host=locahost;dbname=curso_php;charset=utf8", "root", "");
  return $connection;
}
?>