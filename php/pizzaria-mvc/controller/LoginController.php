<?php

require(__DIR__ . "/../model/Access.php");
require(__DIR__ . "/../external/ViewHandler.php");

define("USER_TYPE_ATTENDANT", "user");
define("USER_TYPE_ADMINISTRATOR", "adm");

class LoginController
{
  private string $email;
  private string $password;
  private Access $access;
  private ViewHandler $template;

  public function __construct()
  {
    $this->email = $_POST['email'] ?? '';
    $this->password = $_POST['password'] ?? '';
    $this->access = new Access($this->email, $this->password);
    $this->template = new ViewHandler();
  }

  public function loginRedirect()
  {
    $userData = $this->access->login();

    session_start();

    if ($userData['tipo'] === USER_TYPE_ATTENDANT) {
      $this->template->getSmarty()->assign("title", "Dashboard");
      $this->template->getSmarty()->assign("name", $userData['nome']);
      $this->template->getSmarty()->display('dashboard.tpl');
      $_SESSION['login'] = ['username' => $userData['nome']];
      return;
    }

    if ($userData['tipo'] === USER_TYPE_ADMINISTRATOR) {
      $this->template->getSmarty()->assign("title", "Painel do administrador");
      $this->template->getSmarty()->display('admin-panel.tpl');
      return;
    }

    session_destroy();
    $this->template->getSmarty()->assign("title", "Login");
    $this->template->getSmarty()->display('login.tpl');
  }
}
