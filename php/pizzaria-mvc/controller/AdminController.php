<?php

require(__DIR__ . "/../external/ViewHandler.php");
require(__DIR__ . "/../model/Pizza.php");

class AdminController
{
  public ViewHandler $template;
  public Pizza $pizza;
  public string $submit;
  public string $type;
  public float $price;
  public bool $savedSuccessful = false;

  public function __construct()
  {
    $this->template = new ViewHandler();
    $this->pizza = new Pizza();
    $this->submit = $_POST['submit'] ?? '';
    $this->price = $_POST['price'] ?? 0;
    $this->type = $_POST['type'] ?? '';
  }

  public function templateHandler()
  {
    if (empty($this->submit)) {
      $this->template->getSmarty()->assign("title", "Registrar pizza");
      $this->template->getSmarty()->assign("menuAction", 'Cadastrar pizza');
      $this->template->getSmarty()->assign("name", null);
      $this->template->getSmarty()->assign("action", "Deseja cadastrar algo?");
      $this->template->getSmarty()->assign("menuActionFile", 'pizza-register.php');
      $this->template->getSmarty()->assign("savedSuccessful", false);
      $this->template->getSmarty()->display("pizza-register.tpl");
      return;
    }

    $this->savePizza();
    $this->template->getSmarty()->assign("title", "Registrar pizza");
    $this->template->getSmarty()->assign("menuAction", 'Cadastrar pizza');
    $this->template->getSmarty()->assign("name", null);
    $this->template->getSmarty()->assign("action", "Deseja cadastrar algo?");
    $this->template->getSmarty()->assign("menuActionFile", 'pizza-register.php');
    $this->template->getSmarty()->assign("savedSuccessful", $this->savedSuccessful);
    $this->template->getSmarty()->display("pizza-register.tpl");
  }

  public function savePizza()
  {
    $this->savedSuccessful = $this->pizza->savePizza($this->price, $this->type);
  }
}
