<?php
  $test1 = sha1("Olá mundo");

  echo $test1 . "<br>";

  $test2 = md5("PHP Intermediário");

  echo $test2 . "<br>";

  $test3 = base64_encode("Criptográfia");

  echo $test3 . "<br>";

  echo base64_decode($test3);

?>