<?php
  require_once("func.php");

  try {
    connection();
  } catch (PDOException $ex) {
    echo "<b>Mensagem: </b> " . $ex->getMessage() . "<br>";
    echo "<b>Linha: </b> " . $ex->getLine() . "<br>";
    echo "<b>Arquivo: </b> " . $ex->getFile() . "<br>";
  }

  /*
    try {
      tenta fazer algo
    } catch (Exception $ex) {
      trata os erros
    } finally {
      bloco chamado antes de finalizar a estrutura
    }
  */
?>