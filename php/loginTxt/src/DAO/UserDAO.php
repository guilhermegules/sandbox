<?php
require_once("Model/User.php");

$user = new User();

class UserDAO
{
  private $dir = "Files";
  private $debug = true;

  public function register(User $user)
  {
    try {
      $fileName = $user->getEmail() . ".txt";
      if (!$this->verifyFile($fileName)) {
        $completeDirectory = $this->dir . "/" . $fileName;
        $fopen = fopen($completeDirectory, "w");
        $str = "{$user->getName()};{$user->getEmail()};{$user->getPass()};{$user->getRegisterDate()};";
        if (fwrite($fopen, $str)) {
          fclose($fopen);
          return 1; //Cadastro bem sucedido
        } else {
          fclose($fopen);
          return -10; // Erro ao cadastrar
        }
      } else {
        return -1; //Já cadastrado
      }
    } catch (Exception $exception) {
      if ($this->debug) {
        echo $exception->getMessage();
      }
    }
  }

  public function getUser(string $email) {
    if($this->verifyFile($email)) {
      $completeDirectory = $this->dir . "/" . $email;
      $fopen = fopen($completeDirectory, "r");
      $file = fread($fopen, filesize($completeDirectory));
      $arr = explode(";", $file);
      var_dump($arr);
      $user = new User();
      $user->setName($arr[0]);
      $user->setEmail($arr[1]);
      $user->setPass($arr[2]);
      $user->setRegisterDate($arr[3]);
      fclose($fopen);
      return true;
    }
    return false;
  }

  private function verifyFile(string $fileName)
  {
    $completeDirectory = $this->dir . "/" . $fileName;

    if (file_exists($completeDirectory)) {
      return true;
    }
    return false;
  }
}
