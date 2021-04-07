<?php namespace Web\PHPServer;

class Request 
{
  private $method = null;  
  private $uri = null;  
  private $parameters = [];  
  private $headers = [];

  public function __construct($method, $uri, $headers = [])
  {
    $this->headers = $headers;
    $this->method = strtoupper($method);

    // split uri and parameters string
    @list($this->uri, $params) = explode('?', $uri);

    // parse the parmeters
    parse_str($params, $this->parameters);
  }

  public static function withHeaderString($header) 
  {
    $lines = explode("\n", $header);

    // extract the method and uri
    list( $method, $uri ) = explode(' ', array_shift($lines));

    $headers = [];

    foreach($lines as $line) 
    {
      $line = trim($line);

      if (strpos( $line, ': ') !== false)
      {
        list($key, $value) = explode(': ', $line);
        $headers[$key] = $value;
      }
    }

    // create new request object
    return new static( $method, $uri, $headers );
  }

  public function method()  
  {
    return $this->method;
  }

  public function uri()  
  {
    return $this->uri;
  }

  public function header($key, $default = null) 
  {
    if(!isset($this->headers[$key])) 
    {
      return $default;
    }

    return $this->parameters[$key];
  }
}