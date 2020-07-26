<?php
session_start();

$msg = "&nbsp;";

if (filter_input(INPUT_POST, "btnEntrar", FILTER_SANITIZE_STRING)) {
    $usuario = filter_input(INPUT_POST, "txtNome", FILTER_SANITIZE_STRING);
    $senha = md5(filter_input(INPUT_POST, "txtSenha", FILTER_SANITIZE_STRING)); // a12345z

    if ($usuario == "fulanodetal" && $senha == "f6ba855ff45ea7c2734cd54d62d8bb02") {
        $_SESSION["nome"] = filter_input(INPUT_POST, "txtNome", FILTER_SANITIZE_STRING);
        header("Location: painel.php");
    } else {
        $msg = "<span style='color: red;'>Usuário ou senha inválido.</span>";
    }
}
switch (filter_input(INPUT_GET, "msg", FILTER_SANITIZE_NUMBER_INT)) {
    case 1:
        $msg = "<span style='color: orange;'>Você precisa estar autenticado para acessar.</span>";
        break;
    case 2:
        $msg = "<span style='color: #111;'>Você fez o logout.</span>";
        break;
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

            input{
                padding: 10px;
                box-sizing: border-box;
            }

            input[type="text"], input[type="password"]{
                width:100%;
            }

            h1{
                font-weight: 300;
                text-align: center;
                margin:10px;
            }

            #dvLogin{
                max-width: 300px;
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
        <div id="dvLogin">
            <h1>Entrar</h1>
            <form method="POST">
                <label>Nome: <input type="text" name="txtNome" autocomplete="off" /></label>
                <br/> <br/>
                <label>Senha: <input type="password" name="txtSenha" autocomplete="off" placeholder="a12345z" /></label>
                <br/> <br/>
                <input type="submit" name="btnEntrar" value="Entrar" />
            </form>
            <br />
            <p><?= $msg; ?></p>
        </div>
    </body>
</html>