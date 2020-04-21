<?php
  require_once("../DAO/userDAO.php");
  class UserController {

    private $userDAO;

    public function __construct() {
      $this->userDAO = new UserDAO();  
    }

    public function register(User $user) {
      if(strlen($user->getName() < 3 && strlen($user->getPass()) < 7) && !strpos($user->getEmail(), "@")) {
        return -2; // Dados inválidos
      }
      return $this->userDAO->register($user);
    }
  }
?>