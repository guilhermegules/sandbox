<?php 
  require_once "simple-class.php";

  $user = new User("Calvin", 15);
  echo "Hello, " . $user->getName() . "! You are " . $user->isAdult();

  echo "<br>";

  $user2 = new User("Chris", 39);
  echo "Hello, " . $user2->getName() . "! You are " . $user2->isAdult();
?>