<?php 
  // include_once("read.php"); optional form
  // include_once("write.php"); optional form
  require_once("read.php");
  require_once("write.php");
  save("Include", "file.txt");
  echo read("file.txt");
?>