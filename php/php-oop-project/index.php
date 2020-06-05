<?php

  class User {

    private $username;
    private $email;

    public function __construct($username, $email) {
      $this -> username = $username;
      $this -> email = $email;
    }

    public function addFriend() {
      return "$this->username added a new friend";
    }

    public function getEmail() {
      return $this->email;
    }

    public function getUsername() {
      return $this->email;
    }

    public function setEmail($email) {
      if(strpos($email, '@') > -1) {
        $this->email = $email;
      }
    }

    public function setUsername($username) {
      $this->username = $username;
    }
  }

  $userOne = new User('GuilhermeGM', 'guilhermegules@gmail.com');
  $userTwo = new User('Pedro', 'Pedro@gmail.com');

  // print_r(get_class_vars('User')); method to get class vars
  // print_r(get_class_methods('User')); method to get class methods
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PHP OOP Testing</title>
  </head>
  <body>

  </body>
</html>
