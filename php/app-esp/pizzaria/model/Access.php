<?php

require "./Company.php";
require "./database/Connection.php";

class Access extends Company
{
  private int $id;
  private string $login;
  private string $password;
  
  private $connection;
  private $result;
  private string $sql = "";
  
  public function __construct(string $login, string $password)
  {
    $this->login = $login;
    $this->password = $password;

    // $this->connection = new Connection("193.123.108.138", "iae", "iae", "iae");
  }

  public function login()
  {
    // $this->sql = "SELECT email, senha 
    //   FROM acesso 
    //   WHERE email = '$this->login' AND senha = '$this->password'";

    // $this->result = $this->connectionObject->getConnection()->query($this->sql);

    // $this->rowResult = $this->result->fetch_assoc();

    if ($this->rowResult) {
      return true;
    }

    return false;
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
