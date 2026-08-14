<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pizzaria do Siri Cascudo</title>
</head>

<body>
  <h1>Bem vindo a Pizzaria do Siri Cascudo</h1>

  <form action="./controller/Login.php" method="POST">
    <label for="login">Login:</label>
    <br />

    <input type="text" name="login" id="login" placeholder="Digite seu login" />
    <br />
    <br />

    <label for="password">Senha:</label>
    <br />

    <input type="password" name="password" id="password" placeholder="Digite sua senha" />
    <br />
    <br />

    <input type="submit" value="Login" />
  </form>
</body>

</html>