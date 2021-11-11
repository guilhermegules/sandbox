<?php 
$numbers = $_GET['numbers'];
$accumulator = 0;

foreach($numbers as $number) {
  $accumulator += $number; 
}

echo $accumulator;
