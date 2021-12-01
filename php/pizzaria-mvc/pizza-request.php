<?php

require(__DIR__ . "/controller/PizzaController.php");

$pizzaController = new PizzaController();

$pizzaController->pizzaRequestHandler();
