<?php
  $movies = array(
    "title" => "Titanic",
    "synopsis" => "Um navio colide com ice berg e afunda.",
    "year" => 2017,
    "schedules" => array(
      "16:00", 
      "19:00", 
      "20:00"
    )
    );

  // var_dump($movies);
  
  echo $jsonStr = json_encode($movies);
?>