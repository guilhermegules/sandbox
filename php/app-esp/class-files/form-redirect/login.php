<?php

$login = $_GET['login'];
$password = $_GET['password'];

function validateUser($login, $password) {
  if($login === 'Guilherme' && $password === 'acesso') {
    echo "Você está logado!";
    return;
  }

  header("Location:http://localhost/app-esp/class-files/form-redirect/invalid-user.php?name=$login");
  exit;
}

validateUser($login, $password);