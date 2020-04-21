<?php
require_once("../Model/User.php");

$user = new User();

class UserDAO {
  private $dir = "Arquivos";
  private $debug = true;

  public function register(User $user) {
    try {
      $fileName = $user->getEmail() . ".txt";
      if (!$this->verifyFile($fileName)) {
        $completeDirectory = $this->dir . "/" . $fileName;
        $fopen = fopen($completeDirectory, "w");
        $str = "{$user->getName()};{$user->getEmail()};{$user->getPass()};{$user->getDate()};";
        if(fwrite($fopen, $str)) {
          fclose($fopen);
          return 1; //Cadastro bem sucedido
        } 
        fclose($fopen);
        return -10; // Erro ao cadastrar
      }
      return -1; //Já cadastrado
    } catch (Exception $exception) {
      if ($this->debug) {
        echo $exception->getMessage();
      }
    }
  }

  private function verifyFile(string $fileName) {
    $completeDirectory = $this->dir . "/" . $fileName;

    if (file_exists($completeDirectory)) {
      return true;
    }
    return false;
  }
}
