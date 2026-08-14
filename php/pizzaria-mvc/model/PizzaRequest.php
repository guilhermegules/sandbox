<?php

require(__DIR__ . "/../database/Connection.php");

class PizzaRequest
{
  private Connection $connection;

  public function __construct()
  {
    $this->connection = new Connection();
  }

  public function getPizzaRequests()
  {
    $query = "SELECT * FROM guilherme_pedido";

    $result = $this->connection->getConnection()->query($query);

    $rowResult = $result->fetch_all(MYSQLI_ASSOC);

    return $rowResult;
  }
}
