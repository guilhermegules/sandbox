<?php

require(__DIR__ . "/external/ViewHandler.php");

$template = new ViewHandler();
$template->getSmarty()->assign("title", "Login");
$template->getSmarty()->display('login.tpl');
