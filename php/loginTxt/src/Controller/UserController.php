<?php
require_once("DAO/UserDAO.php");
class UserController
{

  private $userDAO;

  public function __construct()
  {
    $this->userDAO = new UserDAO();
  }

  public function register(User $user)
  {
    if (strlen($user->getName()) > 3 && strlen($user->getPass()) >= 7 && strpos($user->getEmail(), "@") > 0) {
      return $this->userDAO->register($user);
    } else {
      return -2;
    }
  }

  public function getUser(string $email)
  {
    if (strpos($email, "@") > 0 && strpos($email, ".") > 0) {
      return $this->userDAO->getUser($email);
    } else {
      return null;
    }
  }

  public function auth(string $email, string $pass)
  {
    if (strpos($email, "@") > 0 && strpos($email, ".") > 0 && strlen($pass) >= 7) {
      return $this->userDAO->auth($email, $pass);
    } else {
      return null;
    }
  }
}
