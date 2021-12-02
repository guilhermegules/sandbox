<?php

require(__DIR__ . "/../model/PizzaRequest.php");
require(__DIR__ . "/../external/ViewHandler.php");

class ReportController
{

  private PizzaRequest $pizzaRequest;
  private ViewHandler $template;
  private bool $hasDownloadLink = false;

  public function __construct()
  {
    $this->template = new ViewHandler();
    $this->pizzaRequest = new PizzaRequest();
  }

  function processFileData(string $filename = 'relatorio.csv')
  {
    $file = fopen($filename, "w");

    $allRequests = $this->pizzaRequest->getPizzaRequests();

    $fileValue = "";

    foreach ($allRequests as $request) {
      foreach ($request as $value) {
        $fileValue .= "$value;";
      }
      $fileValue .= "\n";
      fputs($file, $fileValue);
    }

    $this->hasDownloadLink = true;

    fclose($file);
  }

  public function templateHandler()
  {
    $this->processFileData();
    $this->template->getSmarty()->assign("title", "Painel do administrador");
    $this->template->getSmarty()->assign("menuAction", 'Cadastrar pizza');
    $this->template->getSmarty()->assign("name", null);
    $this->template->getSmarty()->assign("action", "Deseja cadastrar algo?");
    $this->template->getSmarty()->assign("menuActionFile", 'pizza-register.php');
    $this->template->getSmarty()->assign("hasLink", $this->hasDownloadLink);
    $this->template->getSmarty()->display('admin-panel.tpl');
  }
}
