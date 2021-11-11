<?php
$userData = $_POST;
$template = "";
$titles = [
  "genre" => "Gênero",
  "cpf" => "CPF",
  "rg" => "RG",
  "street" => "Rua",
  "neighborhood" => "Bairro",
  "state" => "Estado",
  "country" => "País",
  "number" => "Número",
  "comments" => "Observações"
];

foreach ($userData as $key => $value) {
  switch ($key) {
    case 'name':
      $template .= "<h2>$value</h2>";
      break;
    case 'browsers':
      $template .= "
        <div class='user-card-row'>
          <h3>Browsers:</h3>
      ";

      foreach ($userData['browsers'] as $browser) {
        $template .= "<p>$browser</p>";
        setcookie($browser, $browser);
      }

      $template .= "</div>";
      break;
    default:
      $template .= "<div class='user-card-row'>
        <h3>$titles[$key]:</h3>
        <p>$value</p>
      </div>";
      break;
  }

  if ($key === 'browsers') break;

  setcookie($key, $value);
}

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/global.css">
  <link rel="stylesheet" href="./styles/save-style.css">
  <title>Usuário salvo</title>
</head>

<body>
  <h1>Dados do usuário salvo</h1>

  <div class="card-container">
    <div class="user-card">
      <?php echo $template ?>
    </div>
  </div>
</body>

</html>