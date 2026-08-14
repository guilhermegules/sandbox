<?php
  class Weather {
    public static $tempConditions = ['cold', 'mild', 'warm'];

    public static function celsiusToFarenheit($celsius) {
      return $celsius * 9 / 5 + 32;
    }

    public static function determinTempCondition($farenheit) {
      if($farenheit < 40) {
        return self::$tempConditions[0];
      } else if($farenheit < 70) {
        return self::$tempConditions[1];
      } else {
        return self::$tempConditions[2];
      }
    } 
  }

  // print_r(Weather::$tempConditions);
  // echo Weather::celsiusToFarenheit(20);
  echo Weather::determinTempCondition(100);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PHP OOP Testing</title>
  </head>
  <body>

  </body>
</html>