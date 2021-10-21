<?php

require("../model/Access.php");

$login = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$access = new Access($login, $password);

echo $access->login() ? "Logado" : "Tente novamente";

