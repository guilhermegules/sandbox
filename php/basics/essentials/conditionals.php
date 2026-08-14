<?php 
  $age = 17;

  if($age > 18) {
    echo "Okay";
  } else {
    echo "Not okay";
  }

  echo "<br>";
  $pass = "5321";

  if($pass == "1235") {
    echo "Pass";
  } else if ($pass === "5321"){
    echo "Pass with another password";
  } else {
    echo "Denied";
  }

  echo "<br>";

  if($age >= 18 && $pass === "5321") {
    echo "User has acess";
  } else {
    echo "User dont has acess";
  }

?>