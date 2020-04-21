<?php
class User { 
  private $name;
  private $email;
  private $pass;
  private $registerDate;

  public function setName($name) {
    $this->name = $name;
  }

  public function getName() {
    return $this->name;
  }

  public function setEmail($email) {
    $this->email = $email;
  }

  public function getEmail() {
    return $this->email;
  }

  public function setPass($pass) {
    $this->pass = md5($pass);
  }

  public function getPass() {
    return $this->pass;
  }

  public function setRegisterDate($registerDate) {
    $this->registerDate = $registerDate;
  }

  public function getRegisterDate() {
    return $this->registerDate;
  }
}

?>