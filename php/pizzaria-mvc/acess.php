<?php

require_once('./external/ViewHandler.php');

// $login = new Login();

// $login->loginRedirect();

$view = new ViewHandler();

$view->getSmarty()->display('login.tpl');
