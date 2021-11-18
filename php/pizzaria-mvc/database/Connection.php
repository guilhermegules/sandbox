<?php

require_once("./Database.environment.php");

class Connection
{

  protected string $host;
  protected string $user;
  protected string $pass;
  protected string $database;

  private $connection;

  public function __construct(
    string $host = HOST,
    string $user = USER,
    string $pass = PASS,
    string $database = DATABASE
  ) {
    $this->host = $host;
    $this->user = $user;
    $this->pass = $pass;
    $this->database = $database;
    $this->connection = new mysqli($host, $user, $pass, $database);
  }

  public function getConnection()
  {
    return $this->connection;
  }
}
