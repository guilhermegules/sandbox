<?php 
  function save(string $text, string $file) {
    $fopen = fopen($file, "a+");
    fwrite($fopen, "{$text} <br>\r\n");
    fclose($fopen);
  }
?>