<?php

require(__DIR__ . "/../model/Pizza.php");
require(__DIR__ . "/../external/ViewHandler.php");

define("PIZZA_TYPE_CALABREZA", "Calabreza");
define("PIZZA_TYPE_PEPERONI", "Peperoni");
define("PIZZA_TYPE_FOUR_CHEESE", "4 Queijos");

class PizzaController
{
  private Pizza $pizza;
  private ViewHandler $template;
  private string $pizzaType;
  private string $pizzaPrice;

  public function __construct()
  {
    session_start();
    $this->template = new ViewHandler();
    $this->pizza = new Pizza();
    $this->pizzaType = $_POST['type'] ?? '';
    $this->pizzaPrice = $_POST['price'] ?? '';
  }

  /**
   * TODOS
   * Add logic to more than five pizzas
   * Add logic to more than fifteen pizzas
   */
  public function pizzaRequestTemplateHandler()
  {
    if (isset($_SESSION['calculatedPrice'])) {
      $calculatedPizzaPrice = $this->pizzaPriceCalcByType() + $_SESSION['calculatedPrice'];
    } else {
      $calculatedPizzaPrice = $this->pizzaPriceCalcByType();
    }

    $pizzaCount = 0;

    if (isset($_SESSION['pizzaCount'])) {
      $pizzaCount = $_SESSION['pizzaCount'] + 1;
    }

    $_SESSION['pizzaCount'] = $pizzaCount;
    $_SESSION['calculatedPrice'] = $calculatedPizzaPrice;

    $pizzas = $this->pizza->getPizzas();

    $types = [];
    $prices = [];

    foreach ($pizzas as $key => $value) {
      if ($key === 'tipo') {
        array_push($types, $value);
      }

      if ($key === 'preco') {
        array_push($prices, $value);
      }
    }

    $this->template->getSmarty()->assign("title", "Realizar pedido");
    $this->template->getSmarty()->assign("action", "O que vamos preparar?");
    $this->template->getSmarty()->assign("name", "");
    $this->template->getSmarty()->assign("types", $types);
    $this->template->getSmarty()->assign("prices", $prices);
    $this->template->getSmarty()->assign("calculatedPrice", $calculatedPizzaPrice);
    $this->template->getSmarty()->assign("pizzaCount", $pizzaCount);
    $this->template->getSmarty()->display('pizza-request.tpl');
  }

  private function pizzaPriceCalcByType()
  {
    switch ($this->pizzaType) {
      case PIZZA_TYPE_CALABREZA:
        return $this->pizzaPrice * 1.07 + 0.75;
      case PIZZA_TYPE_PEPERONI:
        return $this->pizzaPrice * 1.025 + 2.58;
      case PIZZA_TYPE_FOUR_CHEESE:
        return $this->pizzaPrice * 1.01 + 3.21;
      default:
        return 0;
    }
  }
}
