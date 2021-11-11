<?php
  $name = "";
  $age = "";
  $cnh = "";
  $name = $_GET['name'];
  $age = $_GET['age'];
  $cnh = $_GET['cnh'];

  function showCnh($cnh) {
    return "Habilitação: <input type='text' name='cnh' value='$cnh' />";
  }
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aula 3</title>
</head>
<body>
  <form action="aula3.php" action="GET">
    Nome: <input type="text" name="name" value="<?php echo $name ?>" />
    <br />
    Idade: <input type="text" name="age" value="<?php echo $age ?>" />
    <br />
    
    <?php 
      if($age >= 18) {
        echo showCnh($cnh);
      }
    ?>
    <br />

    <input type="submit" value="Enviar" />
    <p>Oi <?php echo $name ?> como você está? sua idade é <?php echo $age ?></p>
  </form>
</body>
</html>