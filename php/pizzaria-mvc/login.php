<?php

require(__DIR__ . '/controller/LoginController.php');

$login = new LoginController();

$login->loginRedirect();
