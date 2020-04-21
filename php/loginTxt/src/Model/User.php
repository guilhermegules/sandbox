<?php

class User { 
  private $name;
  private $email;
  private $pass;
  private $date;

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

  public function setDate($date) {
    $this->date = $date;
  }

  public function getDate() {
    return $this->date;
  }
}

?>