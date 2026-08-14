<?php

require('./utils/user.functions.php');

$login = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$template = "";

if (userAuth($login, $password)) {
  session_start();

  $_SESSION["login"] = ["name" => $login, "sessionId" => session_id()];

  header('Location: ./register.php');
  exit();
} else {
  $template = "
      <div class='invalid-login'>
        <h2>Suas credenciais estão inválidas!</h2>
        <span>por favor acesse esse <a href='../index.php'>link</a> e tente novamente</span>
      </div>
    ";
}

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/global.css">
  <title>Processo de login</title>
</head>

<body>
  <?php echo $template ?>
</body>

</html>