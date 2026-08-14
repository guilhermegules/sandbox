<?php

session_start();

echo "ID da sessão " . session_id();

$_SESSION['login'] = 44;

// echo "<pre>";
// print_r($_SERVER);
// echo "</pre>";

echo "<pre>";
print_r($_SESSION);
echo "</pre>";