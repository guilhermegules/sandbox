<?php

require(__DIR__ . '/../inc/smarty/libs/Smarty.class.php');

class ViewHandler
{
  private Smarty $smarty;

  public function __construct()
  {
    $this->smarty = new Smarty;
    $this->smarty->template_dir = __DIR__ . "/../view";
    $this->smarty->compile_dir  = __DIR__ . "/../inc/smarty/templates_c";
  }

  public function getSmarty()
  {
    return $this->smarty;
  }
}
