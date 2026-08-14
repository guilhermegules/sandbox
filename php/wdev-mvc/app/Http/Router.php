<?php

namespace App\Http;

class Router 
{
  private string $url = '';
  private string $prefix = '';
  private array $routes = [];
  private Request $request;
  
  public function __construct(string $url)
  {
    $this->request = new Request();
    $this->url = $url;
  }
}