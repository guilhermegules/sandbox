<?php
session_start();

if(!isset($_SESSION["nome"])){
    header("Location: index.php?msg=1");
}
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Login</title>
        <meta charset="utf-8" />
        <style>
            *{
                margin: 0 auto;
                font-family: "Segoe UI";
            }

            h1{
                font-weight: 300;
                text-align: center;
                margin:10px;
            }

            #dvCentro{
                max-width: 600px;
                width:100%;
                background-color: #d7e6ef;
                border: 2px solid #6b8799;
                box-sizing: border-box;
                padding:10px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div id="dvCentro">
            <h1><?= $_SESSION["nome"] ?></h1>
            <a href="sair.php">Sair</a>
        </div>
    </body>
</html>