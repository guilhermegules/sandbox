<?php

require __DIR__.'/vendor/autoload.php';

use \App\Http\Router;
use \App\Controller\Pages\Home;

define('URL', 'http://localhost');

$router = new Router(URL);

echo "<pre>";
print_r($router);
echo "</pre>";


exit;
echo Home::getHome();