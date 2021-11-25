<?php

require(__DIR__ . "/external/ViewHandler.php");

session_start();

$username = $_SESSION['login']['username'];

$template = new ViewHandler();

$template->getSmarty()->assign("title", "Dashboard");
$template->getSmarty()->assign("name", $username);
$template->getSmarty()->display('dashboard.tpl');
