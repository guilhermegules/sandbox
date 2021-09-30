<?php

require('./utils/pizza-view-formatter.php');
require('./utils/admin-view.php');

session_start();

$username = $_SESSION['login']['username'];
$userType = $_SESSION['login']['userType'];
$totalSales = $_COOKIE['totalSales'] ?? 0;

function userTypeValidation(string $username, string $userType) {
  if($userType === 'ATTENDANT') {
    $pizzas = isset($_COOKIE['pizzas']) ? json_decode($_COOKIE['pizzas'], true) : array();
    return pizzaTemplateHandler($username, $pizzas);
  }

  return adminTemplateHandler();
}

function pizzaRegister() {
  $flavor = strtolower($_POST['flavor'] ?? '');
  $price = doubleval($_POST['price'] ?? 0);

  $pizzas = isset($_COOKIE['pizzas']) ? json_decode($_COOKIE['pizzas'], true) : array();

  if($flavor !== '') {
    $pizzas[$flavor] = $price;
    setcookie("pizzas", json_encode($pizzas));
  }
}

function pizzaCalculation() {
  $flavor = strtolower($_POST['flavor'] ?? '');
  $price = doubleval($_POST['price'] ?? 0);

  $counter = $_COOKIE['howManyPizzas'] ?? 0;

  if($flavor === 'calabreza') {
    $counter++;
    setcookie('howManyPizzas', $counter);
    return $price * 1.07 + 0.75;
  }
  
  if($flavor === 'peperoni') {
    $counter++;
    setcookie('howManyPizzas', $counter);
    return $price * 1.025 + 2.58;
  }
  
  if($flavor === 'portuguesa') {
    $counter++;
    setcookie('howManyPizzas', $counter);
    return $price * 1.01 + 3.21;
  }

  return 0;
}

echo userTypeValidation($username, $userType);

$totalSales += pizzaCalculation();

setcookie('totalSales', $totalSales);

if($userType === "ATTENDANT") {
  echo "<p>Valor da pizza R$ " . pizzaCalculation() . "</p>";
  echo "<p>O total de vendas foi de R$ $totalSales</p>";
} else {
  echo pizzaRegister();
}

if(isset($_COOKIE['howManyPizzas']) && $_COOKIE['howManyPizzas'] >= 5) {
  echo "<p>Show! Você vai receber uma CocaCola de brinde</p>";
}

if(isset($_COOKIE['howManyPizzas']) && $_COOKIE['howManyPizzas'] >= 15 && isset($totalSales)) {
  $bonusCalculation = $totalSales * 0.05;
  echo "<p>Parabéns, $username! Você irá ganhar um bonus de R$ $bonusCalculation</p>";
}

if(isset($_POST['logout'])) {
  setcookie('howManyPizzas', 0);
  setcookie('totalSales', 0);
  header('Location: ../index.php');
  exit();
}

echo "
  <form method='POST'>
    <input type='submit' name='logout' value='Logout' />
  </form>
";

