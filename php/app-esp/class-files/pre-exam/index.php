<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>
<body>
  
  <form action="./src/login.php" method="post">
    <label for="login">Login:</label>
    <input type="text" name="login" id="login" placeholder="Digite seu login">

    <label for="password">Senha:</label>
    <input type="password" name="password" id="password" placeholder="Digite sua senha">

    <input type="submit" value="Login">
  </form>

</body>
</html>