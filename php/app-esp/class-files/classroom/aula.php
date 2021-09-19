<?php

  $name = $_GET['name'];
  $address = $_GET['address'];
  $cellphone = $_GET['cellphone'];

?>

<table width="100%" border="2">
  <tr>
    <td>
      <p>Nome:</p>
    </td>
    <td>
      <?php echo $name ?>
    </td>
  </tr>
  <tr>
    <td>
      <p>Telefone:</p>
    </td>
    <td>
      <?php echo $cellphone ?>
    </td>
  </tr>
  <tr>
    <td>
      <p>Endereço:</p>
    </td>
    <td>
      <?php echo $address ?>
    </td>
  </tr>
</table>
