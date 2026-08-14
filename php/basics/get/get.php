<?php 
  $names = ["Valentina", "Fernanda", "Caroline", "Amber"];
  // $name = $_GET["nome"];
  // $email = $_GET["email"];

  $name = filter_input(INPUT_GET, "txtName", FILTER_SANITIZE_STRING);
  $email = filter_input(INPUT_GET, "txtEmail", FILTER_SANITIZE_STRING);
  $employeId = filter_input(INPUT_GET, "selectEmploye", FILTER_SANITIZE_NUMBER_INT);
  $employe = "";

  if ($employeId) {
    $employe = $names[$employeId];
  }

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <style>
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    input {
      margin: 1em;
    }
  </style>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulário</title>
</head>
<body>
  <section>
    <form method="get">
    <label>Nome: </label>
      <input type="text" name="txtName">
      <label>E-mail: </label>
      <input type="email" name="txtEmail">
      <label>Funcionário: </label>
      <select name="selectEmploye">
        <?php
          for($i = 0; $i < sizeof($names); $i++) {
            ?>
              <option value="<?= ($i + 1); ?>"><?=$names[$i]; ?></option>
            <?php
          }
        ?>
      </select>
      <input type="submit" name="btnSubmit" value="cadastrar">
      <a href="http://localhost:8080/php_playground/get/get.php">Atualizar</a>
    </form>
  </section>
  <hr>
  <p>Nome: <?= $name;?></p>
  <p>Email: <?= $email;?></p>
  <p>Employe: <?= $employe;?></p>
</body>
</html>