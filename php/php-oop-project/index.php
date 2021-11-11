<?php
  // TODO adjust inheritance on UserAdmin
  class User {

    private $username;
    private $email;
    private $role = "member";

    public function __construct($username, $email) {
      $this -> username = $username;
      $this -> email = $email;
    }

    public function addFriend() {
      return "$this->username added a new friend";
    }

    public function message() {
      return "$this->email sent a new message";
    }

    public function getRole() {
      return $this->role;
    }

    public function getEmail() {
      return $this->email;
    }

    public function getUsername() {
      return $this->username;
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

  class AdminUser extends User {
    
    private $level;
    private $role = "admin";

    public function __construct($username, $email, $level) {
      $this->level = $level;
      parent::__construct($username, $email);
    }

    public function message() {
      return "$this->email, an admin, sent a new message";
    }

    public function getLevel() {
      return $this->level;
    }

    public function setLevel($level) {
      $this->level = $level;
    }

  }

  $userOne = new User('GuilhermeGM', 'guilhermegules@gmail.com');
  $userTwo = new User('Pedro', 'pedro@gmail.com');
  $userThree = new AdminUser('João', 'joao@gmail.com', 5);

  echo $userThree->getUsername() . "<br>";
  echo $userThree->getEmail() . "<br>";
  echo $userThree->getLevel() . "<br>";

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
