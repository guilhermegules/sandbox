<?php

function calculation() {
  switch($_GET['operation']) {
    case "+":
      return  $_GET['first-number'] +  $_GET['second-number'];
    case "-":
      return $_GET['first-number'] - $_GET['second-number'];
    case "*":
      return $_GET['first-number'] * $_GET['second-number'];
    case "/":
      return $_GET['first-number'] / $_GET['second-number'];
  }
}

?>

<table width="100%" border="2">
  <tr>
    <td>Resultado</td>
    <td><?php echo calculation(); ?></td>
  </tr>
</table>