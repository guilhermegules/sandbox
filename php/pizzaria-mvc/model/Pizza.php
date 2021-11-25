<?php

require(__DIR__ . "/../database/Connection.php");

class Pizza
{
  private Connection $connection;

  public function __construct()
  {
    $this->connection = new Connection();
  }

  public function getPizzas()
  {
    $this->query = "SELECT * FROM guilherme_pizza";

    $result = $this->connection->getConnection()->query($this->query);

    $rowResult = $result->fetch_assoc();

    return $rowResult;
  }
}
