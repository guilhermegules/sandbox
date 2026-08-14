<?php

$login = $_POST['login'];
$pass = $_POST['password'];


function auth(string $login, string $password) {
  if($login === 'Pedro' && $password === '123') {
    return 'ADMIN';
  }

  if($login === 'Maria' && $password === '321') {
    return 'ATTENDANT';
  }

  return '';
}

function loginHandler($login, $password) {
  $authValue = auth($login, $password);

  if(empty($authValue)) {
    echo "Login inválido, <a href='../index.php'>tente novamente</a>";
    return;
  }

  session_start();

  $_SESSION['login'] = ['username' => $login, 'userType' => $authValue];

  header('Location: ./home.php');
  exit();
}

loginHandler($login, $pass);