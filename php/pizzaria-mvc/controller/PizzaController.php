<?php

require(__DIR__ . "/../model/Pizza.php");
require(__DIR__ . "/../external/ViewHandler.php");

define("PIZZA_TYPE_CALABREZA", "Calabreza");
define("PIZZA_TYPE_PEPERONI", "Peperoni");
define("PIZZA_TYPE_FOUR_CHEESE", "Quatro queijos");

define("ADD_PIZZA", "ADD");
define("SAVE_PIZZA", "SAVE");

class PizzaController
{
  private Pizza $pizza;
  private ViewHandler $template;
  private string $pizzaType;
  private float $pizzaPrice;
  private string $pizzaAction;
  private float $totalPrice = 0;
  private int $pizzaCount = 0;
  private float $bonus = 0;
  private array $pizzaTypes = [];
  private array $pizzaPrices = [];
  private bool $hasBeenSaved = false;

  public function __construct()
  {
    session_start();
    $this->template = new ViewHandler();
    $this->pizza = new Pizza();
    $this->pizzaType = $_POST['type'] ?? '';
    $this->pizzaPrice = $_POST['price'] ?? 0;
    $this->pizzaAction = $_POST['submit'] ?? '';
  }

  public function pizzaRequestHandler()
  {
    switch ($this->pizzaAction) {
      case SAVE_PIZZA:
        $this->save();
        break;
      case ADD_PIZZA:
        $this->addPizza();
        break;
      default:
        $this->pizzaTypeAndPriceHandler();
        $this->templateHandler();
        break;
    }
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

  private function save()
  {
    $userId = $_SESSION['login']['id'];
    $pizzaCount = $_SESSION['pizzaCount'];
    $totalPrice = $_SESSION['calculatedPrice'];
    $bonus = $_SESSION['bonus'];

    if ($this->pizzaCount >= 5) {
      $this->hasBeenSaved = $this->pizza->savePizzaRequest($pizzaCount, $totalPrice, $userId, true);
      $this->pizzaTypeAndPriceHandler();
      $this->templateHandler();
      return;
    }

    if ($this->pizzaCount > 15) {
      $this->hasBeenSaved = $this->pizza->savePizzaRequest($pizzaCount, $totalPrice, $userId, true, $bonus);
      $this->pizzaTypeAndPriceHandler();
      $this->templateHandler();
      return;
    }

    $this->hasBeenSaved = $this->pizza->savePizzaRequest($pizzaCount, $totalPrice, $userId);
    $this->pizzaTypeAndPriceHandler();
    $this->templateHandler();
  }

  private function addPizza()
  {
    if (isset($_SESSION['calculatedPrice'])) {
      $this->totalPrice += $this->pizzaPriceCalcByType() + $_SESSION['calculatedPrice'];
    } else {
      $this->totalPrice += $this->pizzaPriceCalcByType();
    }

    if (isset($_SESSION['pizzaCount'])) {
      $this->pizzaCount = $_SESSION['pizzaCount'] + 1;
    }

    $this->bonus = $this->totalPrice * 0.005;

    $_SESSION['pizzaCount'] = $this->pizzaCount;
    $_SESSION['calculatedPrice'] = $this->totalPrice;
    $_SESSION['bonus'] = $this->bonus;

    $this->pizzaTypeAndPriceHandler();
    $this->templateHandler();
  }

  private function pizzaTypeAndPriceHandler()
  {
    $pizzas = $this->pizza->getPizzas();

    foreach ($pizzas as $pizza) {
      foreach ($pizza as $key => $value) {
        if ($key === 'tipo') {
          array_push($this->pizzaTypes, $value);
        }

        if ($key === 'preco') {
          array_push($this->pizzaPrices, $value);
        }
      }
    }
  }

  private function templateHandler()
  {
    $this->template->getSmarty()->assign("title", "Realizar pedido");
    $this->template->getSmarty()->assign("action", "O que vamos preparar?");
    $this->template->getSmarty()->assign("name", null);
    $this->template->getSmarty()->assign("types", $this->pizzaTypes);
    $this->template->getSmarty()->assign("prices", $this->pizzaPrices);
    $this->template->getSmarty()->assign("calculatedPrice", $this->totalPrice);
    $this->template->getSmarty()->assign("pizzaCount", $this->pizzaCount);
    $this->template->getSmarty()->assign("hasBeenSaved", $this->hasBeenSaved);
    $this->template->getSmarty()->assign("bonus", $this->bonus);
    $this->template->getSmarty()->assign("user", $_SESSION['login']['username']);
    $this->template->getSmarty()->display('pizza-request.tpl');
  }
}
