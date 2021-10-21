<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "./model/Access.php";

$access = new Access("guilhermegules@gmail.com", "123");

echo $access->login() ? "Logado" : "Tente novamente";

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login pizzaria</title>
</head>
<body>
  <h1>Pizzaria</h1>
</body>
</html>
