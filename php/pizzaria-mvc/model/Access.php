<?php

require(__DIR__ . "/../database/Connection.php");

class Access
{
  private int $id;
  private string $login;
  private string $password;

  private $connectionObject;
  private $result;
  private string $sql;

  public function __construct(string $login, string $password)
  {
    $this->login = $login;
    $this->password = $password;

    $this->connectionObject = new Connection();
  }

  public function login()
  {
    $this->sql = "SELECT email, senha FROM acesso WHERE email = '$this->login' AND senha = '$this->password'";

    $this->result = $this->connectionObject->getConnection()->query($this->sql);

    $this->rowResult = $this->result->fetch_assoc();

    if (empty($this->rowResult['email']) && empty($this->rowResult['senha'])) {
      return false;
    }

    return true;
  }

  public function getId()
  {
    return $this->id;
  }

  public function setId(int $id)
  {
    $this->id = $id;
  }

  public function getLogin()
  {
    return $this->login;
  }

  public function setLogin(string $login)
  {
    $this->login = $login;
  }

  public function getPassword()
  {
    return $this->password;
  }

  public function setPassword(string $password)
  {
    $this->password = $password;
  }
}
