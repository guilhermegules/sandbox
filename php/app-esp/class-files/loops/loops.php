<?php

echo "<h3>While</h3>";
$x = 0;
while($x <= 10) 
{
  echo "<br />" . $x;
  $x++;
}

echo "<h3>Do While</h3>";
$y = 0;
do 
{
  echo "<br/>" . $y;
  $y++;
} while($y <= 10);

$person['name'][0] = 'Guilherme';
$person['name'][1] = 'Pedro';
$person['cellphone'][0] = '111111111';
$person['cellphone'][1] = '111111111';

echo "<br/><pre>";
print_r($person);
echo "</pre>";

$arrayName['simpleValue'] = "test";

echo "<br/><pre>";
print_r($arrayName);
echo "</pre>";

echo "<br/>";

$array2D[0][0] = "Guilherme";
$array2D[0][1] = "Gules";
$array2D[0][2] = "Gules";

echo "<br/>" . count($array2D, 1);

for ($x = 0; $x < count($array2D); $x++) { 
  for ($y = 0; $y <= count($array2D); $y++) { 
    echo "<br/>" . $array2D[$x][$y];
  }
}