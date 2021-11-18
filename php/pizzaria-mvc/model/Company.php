<?php

class Company
{
  private int $id;
  private string $name;
  private string $address;

  public function getCompanyId()
  {
    return $this->id;
  }

  public function setCompanyId(int $id)
  {
    $this->id = $id;
  }

  public function getName()
  {
    return $this->name;
  }

  public function setName(string $name)
  {
    $this->name = $name;
  }

  public function getAddress()
  {
    return $this->address;
  }

  public function setAddress(string $address)
  {
    $this->address = $address;
  }
}
