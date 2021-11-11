<?php
  $salary = 2000;
  $adjust = 0;

  function adjustSalary($salary, &$adjust) { //reference with &
    $adjust = 300.00;

    return ($salary + $adjust);
  }

  $final = adjustSalary($salary, $adjust);
  echo "Adjusted salary is: <b>R$ {$final}</b>, with raise of: <b>R$ {$adjust}</b>."
?>