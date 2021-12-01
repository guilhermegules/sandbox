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
    $query = "SELECT * FROM guilherme_pizza";

    $result = $this->connection->getConnection()->query($query);

    $rowResult = $result->fetch_all(MYSQLI_ASSOC);

    return $rowResult;
  }

  public function savePizzaRequest(int $pizzasQuantity, float $totalPrice, int $userId, $hasGift = false, $comission = 0)
  {
    $castHasGiftValue = intval($hasGift);

    $query = "INSERT INTO guilherme_pedido (quantidade, total, brinde, id_usuario, comissao) VALUES ($pizzasQuantity, $totalPrice, $castHasGiftValue, $userId, $comission);";

    return $this->connection->getConnection()->query($query);
  }
}
