<?php 
  session_start();

  // $_SESSION["key"] = date("d/m/Y - H:i:s");

  if(isset($_SESSION["key"])) {
    echo $_SESSION["key"];
  }

  // session_destroy();
?>