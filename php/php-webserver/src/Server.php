<?php namespace Web\PHPServer;

use Web\PHPServer\Exception;
use Web\PHPServer\Request;

class Server 
{
  private $host = null;  
  private $port = null;  
  private $socket = null;  

  public function __construct($host, $port) 
  {
    $this->host = $host;
    $this->port = $port;

    // Create a socket
    $this->createSocket();

    // Bind the created socket
    $this->bind();
  }

  /**
   * The first argument specifies the domain / protocol family of the socket. AF_INET is for IPv4 TCP and UDP protocols.
   * The second argument defines the communication type of the socket. SOCK_STREAM is a simple full-duplex connection based byte stream.
   * The third argument sets the protocol.
   */
  public function createSocket() 
  {
    $this->socket = socket_create(AF_INET, SOCK_STREAM, 0);
  }

  public function bind() 
  {
    if ( !socket_bind($this->socket, $this->host, $this->port))
    {
        throw new Exception('Could not bind: '.$this->host.':'.$this->port.' - '.socket_strerror(socket_last_error()));
    }
  }

  public function listen($callback) 
  {
    if(!is_callable($callback)) 
    {
      throw new Exception('The given argument should be callable.');
    }

    // Now here comes the thing that makes this process
    // long, infinite, never ending...
    while(true) {
      // listen for connections
      socket_listen($this->socket);

      // try to get the client socket resource
      // if false we got an error close the connection and skip
      if(!$client = socket_accept($this->socket)) 
      {
        socket_close($client);
        continue;
      }

      // create new request instance with the clients header.
      // In the real world of course you cannot just fix the max size to 1024...
      $request = Request::withHeaderString(socket_read($client, 1024));

      // execute the callback 
      $response = call_user_func($callback, $request);

      if(!$response || !$response instanceof Response) 
      {
        $response = Response::error(404);
      }

      $response = (string) $response;

      // write the response to the client socket
      socket_write($client, $response, strlen($response));

      // close the connetion so we can accept new ones
      socket_close($client);
    }
  }
}