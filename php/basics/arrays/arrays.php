<?php
  // $arrayName = array("Pedro", "Fernanda", "Marcos", "Joana");
  $arrayName = ["Pedro", "Fernanda", "Marcos", "Joana"];

  for($i = 0; $i < sizeof($arrayName); $i++) {
    echo $arrayName[$i] . "<br>";
  }

  $arrayStudent = array(
    "student" => array(
        "name" => "Julia",
        "grade" => 10 
    )
    );
    
  echo "<br>";
  echo $arrayStudent["student"]["name"];
?>