<?php

require('./utils/pizza-view-formatter.php');

session_start();

$username = $_SESSION['login']['username'];
$userType = $_SESSION['login']['userType'];

function userTypeValidation(string $username, string $userType) {
  if($userType === 'ATTENDANT') {
    return "Bem vindo(a), $username";
  }

  return pizzaTemplateHandler();
}

function pizzaCalculation() {
  $flavor = strtolower($_POST['flavor'] ?? '');
  $price = doubleval($_POST['price'] ?? 0);

  $counter = $_COOKIE['howManyPizzas'] ?? 0;

  if($flavor === 'calabreza') {
    $counter++;
    setcookie('howManyPizzas', $counter);
    return $price * 1.15 + 0.55;
  }
  
  if($flavor === 'peperoni') {
    $counter++;
    setcookie('howManyPizzas', $counter);
    return $price * 1.05 + 1.55;
  }
  
  if($flavor === 'portuguesa') {
    $counter++;
    setcookie('howManyPizzas', $counter);
    return $price * 1.18 + 2.5;
  }
}

echo userTypeValidation($username, $userType);

echo pizzaCalculation();

echo "<br/>";

if(isset($_COOKIE['howManyPizzas']) && $_COOKIE['howManyPizzas'] >= 3) {
  echo "Show! Você vai receber uma CocaCola de brinde";
}

if(isset($_POST['logout'])) {
  setcookie('howManyPizzas', 0);
  header('Location: ../index.php');
}

echo "
  <form method='POST'>
    <input type='submit' name='logout' value='Logout' />
  </form>
";

