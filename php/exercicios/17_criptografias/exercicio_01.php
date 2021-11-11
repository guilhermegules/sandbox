<?php
/*
 * Desenvolva um formulário HTML que tenha dois campos de texto, um para o nome e outro para o e-mail. 
 * Nesta página crie as seguintes funcionalidades:
 * Verifique se o nome possui mais ou 5 caracteres;
 * Verifique se o e-mail foi digitado;
 * Caso os campos estejam validados, criptografe o e-mail e envie para uma outra página via query string;
 * Utilize o header (“Location: pagina.php”);;
 * Na segunda página descriptografe o e-mail e exiba-o na tela.
 */

$msg = "";

if (filter_input(INPUT_POST, "btnGravar", FILTER_SANITIZE_STRING)) {
    if (strlen(filter_input(INPUT_POST, "txtNome", FILTER_SANITIZE_STRING)) >= 5) {
        if (strlen(filter_input(INPUT_POST, "txtEmail", FILTER_SANITIZE_STRING)) >= 2) {
            $mail = base64_encode(filter_input(INPUT_POST, "txtEmail", FILTER_SANITIZE_STRING));
            header("Location: ler.php?mail={$mail}");
        } else {
            $msg = "<span style='color: red;'>E-mail inválido.</span>";
        }
    } else {
        $msg = "<span style='color: red;'>Nome inválido. (min. 5 cracteres)</span>";
    }
}
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Criptografia</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <form method="POST">
            <label>Nome: <input type="text" name="txtNome" /></label>
            <br/> <br/>
            <label>E-mail: <input type="text" name="txtEmail" /></label>
            <br/> <br/>
            <input type="submit" name="btnGravar" value="Gravar" />
        </form>
        <br />
        <p><?= $msg; ?></p>
    </body>
</html>
