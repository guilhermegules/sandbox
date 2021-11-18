<?php

require_once '../inc/smarty/libs/Smarty.class.php';

class ViewHandler
{
  private Smarty $smarty;

  public function __construct()
  {
    $this->smarty = new Smarty;
    $this->smarty->template_dir = "view";
    $this->smarty->compile_dir  = "inc/smarty/templates_c";
  }

  public function getSmarty()
  {
    return $this->smarty;
  }
}
