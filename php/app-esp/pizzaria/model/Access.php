<?php

class Access extends Company
{
  private int $id;
  private string $login;
  private string $password;

  public function login()
  {
    if ($this->login === 'guilherme' && $this->password === '1234') {
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
