<?php 

$numberFromSelect = $_GET['selectNumber'] ?? null;
$numbers = $_GET['numbers'] ?? [];

echo "<pre>";
print_r([
  $_GET['name'] ?? '', 
  $_GET['age'] ?? 0, 
  $_GET['message'] ?? '', 
  $_GET['system'] ?? '', 
  $_GET['monitor'] ?? '', 
  $_GET['numbers']['10'] ?? [], 
  $_GET['number'] ?? 0
]);
echo "</pre>";

foreach($numbers as $number) 
{
  echo "[$number]"; 
}

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aula 4</title>
</head>
<body>
  <form action="./aula4.php" method="get">
    <label for="name">Nome:</label>
    <input type="text" name="name" id="name">
    <br />

    <label for="age">Idade:</label>
    <input type="text" name="age" id="age">
    <br />

    <label for="message">Mensagem:</label>
    <textarea type="text" name="message" id="message"> </textarea>
    <br />

    <p>Sistema operacional:</p>
    <input type="radio" name="system" value="Windows" id="windows"/> <label for="windows">Windows</label>
    <input type="radio" name="system" value="Linux" id="linux"/> <label for="linux">Linux</label>
    <input type="radio" name="system" value="Macos" id="macos"/> <label for="macos">Mac OS</label>
    <br />

    <p>Monitor:</p>
    <input type="radio" name="monitor" value="lg"/> LG
    <input type="radio" name="monitor" value="samsung" /> Samsung
    <input type="radio" name="monitor" value="dell" /> Dell
    <br />

    <p>Números:</p>
    <input type="checkbox" name="numbers[10]" value="10"> 10 
    <input type="checkbox" name="numbers[20]" value="20"> 20
    <input type="checkbox" name="numbers[30]" value="30"> 30
    <input type="checkbox" name="numbers[100]" value="100"> 100
    <br />

    <p>Selecione um número: </p>
    <select name="selectNumber">
      <option value="0">Selecione</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <br />

    <?php 
      if((int) $numberFromSelect === 0) 
      {
        echo "Informe um valor válido!";
      }
    ?>

    <button type="submit">Enviar</button>
  </form>
</body>
</html>