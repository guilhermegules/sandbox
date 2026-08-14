<?php

require(__DIR__ . "/controller/AdminController.php");

$adminController = new AdminController();

$adminController->templateHandler();
