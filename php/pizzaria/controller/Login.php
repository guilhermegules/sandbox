<?php

require("../model/Access.php");

class Login
{
  private string $login = '';
  private string $password = '';
  private Access $access;

  public function __construct()
  {
    $this->login = $_POST['login'];
    $this->password = $_POST['password'];
    $this->access = new Access($this->login, $this->password);
  }

  public function loginRedirect()
  {
    echo $this->access->login() ? "Logado" : "Tente novamente";
  }
}

$login = new Login();

$login->loginRedirect();
