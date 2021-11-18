<?php

require("../model/Access.php");
require("../external/ViewHandler.php");

class Login
{
  private string $login = '';
  private string $password = '';
  private Access $access;
  private ViewHandler $template;

  public function __construct()
  {
    $this->login = $_POST['login'];
    $this->password = $_POST['password'];
    $this->access = new Access($this->login, $this->password);
    $this->template = new ViewHandler();
  }

  public function loginRedirect()
  {
    // if ($this->access->login()) {
    $this->template->getSmarty()->display('dashboard.tpl');
    // return;
    // }
  }
}
