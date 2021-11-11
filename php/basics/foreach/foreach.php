<?php
  $fruits = ["Grape", "Banana", "Apple", "Orange"];

  foreach($fruits as $item) {
    echo $item . "<br>";
  }

  echo "<br>";

  $fruits2 = [
    1 => "Grape",
    2 => "Banana",
    3 => "Apple",
    4 => "Orange"];

  foreach($fruits2 as $key => $item) {
    echo "Key: {$key} => Value: {$item} <br>";
  }

?>