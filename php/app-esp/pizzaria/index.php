<?php

require("./model/Access.php");

$access = new Access();

$access->setLogin("guilherme");
$access->setPassword("1234");

echo $access->login();
