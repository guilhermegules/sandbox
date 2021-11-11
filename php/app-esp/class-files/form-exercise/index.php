<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./src/styles/global.css">
  <link rel="stylesheet" href="./src/styles/login-style.css">
  <title>Login</title>
</head>

<body>
  <form action="./src/login.php" method="POST">
    <h1>Realize o login</h1>

    <div class="form-container">
      <div class="card">
        <div class="row">
          <label for="login">Login: </label>
          <input type="text" name="login" id="login" placeholder="Digite o seu usuário" />
        </div>

        <div class="row">
          <label for="password">Senha: </label>
          <input type="password" name="password" id="password" placeholder="Digite a sua senha" />
        </div>

        <input type="submit" value="Login" />
      </div>
    </div>
  </form>
</body>

</html>