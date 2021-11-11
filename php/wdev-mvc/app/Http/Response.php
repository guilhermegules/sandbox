<?php

namespace App\Http;

class Response 
{

  private int $statusCode = 200;
  private array $headers = [];
  private string $contentType;
  private mixed $content;

  public function __construct(int $statusCode, mixed $content, string $contentType = 'text/html') 
  {
    $this->statusCode = $statusCode;
    $this->content = $content;
    $this->setContentType($contentType);
  }
  
  public function setContentType(string $contentType) 
  {
    $this->contentType = $contentType;
    $this->setHeader('Content-Type', $contentType);
  }

  public function setHeader(string $key, string $value) 
  {
    $this->headers[$key] = $value;
  }

  public function sendResponse() 
  {
    $this->sendHeaders();
    
    switch($this->contentType) {
      case 'text/html':
        echo $this->content;
      break;
    }
  }

  private function sendHeaders() 
  {
    http_response_code($this->statusCode);

    foreach($this->headers as $key => $value) 
    {
      header("$key:$value");
    }
  }
}