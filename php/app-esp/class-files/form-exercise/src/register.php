<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/global.css">
  <link rel="stylesheet" href="./styles/register-style.css" />
  <title>Registro de usuário</title>
</head>

<body>
  <form action="./save.php" method="POST">
    <div class="form-fill">
      <h1>Cadastro de novo usuário</h1>

      <div class="register-grid">
        <div class="row">
          <label for="name">Nome:</label>
          <input name="name" id="name" type="text" placeholder="Digite o seu nome" />
        </div>

        <div class="row">
          <span>Genero:</span>
          <div class="input-group">
            <input type="radio" name="genre" id="genre" value="M"><label for="genre">Masculino</label>
            <input type="radio" name="genre" id="genre" value="F"><label for="genre">Feminino</label></input>
          </div>
        </div>

        <div class="row">
          <label for="cpf">CPF:</label>
          <input name="cpf" id="cpf" type="text" placeholder="Digite o seu CPF" />

          <label for="rg">RG:</label>
          <input name="rg" id="rg" type="text" placeholder="Digite o seu RG" />
        </div>

        <div class="row">
          <label for="street">Rua:</label>
          <input type="text" name="street" id="street" placeholder="Digite a sua rua" />

          <label for="neighborhood">Bairro</label>
          <input type="text" name="neighborhood" id="neighborhood" placeholder="Digite o seu bairro">
        </div>

        <div class="row">
          <label for="state">Estado:</label>
          <input type="text" name="state" id="state" placeholder="Digite o nome do seu estado">

          <label for="country">País:</label>
          <input type="text" name="country" id="country" placeholder="Digite qual é o seu país">
        </div>

        <div class="row">
          <label for="number">Número:</label>
          <input type="number" name="number" id="number" placeholder="Digite o número da sua casa">
        </div>

        <div class="row">
          <label for="comments">Observações:</label>
          <textarea name="comments" id="comments" cols="30" rows="10" placeholder="Qualquer mensagem é bem vida"></textarea>
        </div>

        <div class="row">
          <span>Browsers de preferência:</span>
          <div class="input-group">
            <input type="checkbox" name="browsers[]" id="chrome" value="chrome"><label for="chrome">Chrome</label></input>
            <input type="checkbox" name="browsers[]" id="firefox" value="firefox"><label for="firefox">Firefox</label></input>
            <input type="checkbox" name="browsers[]" id="edge" value="edge"><label for="edge">Edge</label></input>
            <input type="checkbox" name="browsers[]" id="opera" value="opera"><label for="opera">Opera</label></input>
          </div>
        </div>
      </div>

      <input type="submit" value="Salvar">
    </div>
  </form>
</body>

</html>