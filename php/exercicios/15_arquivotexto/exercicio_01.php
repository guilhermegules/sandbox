<?php
/*
 * Crie uma página com um formulário, onde o usuário deva informar o 
 * seu nome, e-mail, telefone e rg. Grave estas informações em um arquivo texto, 
 * porém para o final de cada bloco, adicione os caracteres ----, para separar 
 * os demais cadastros. Crie também uma segunda página para ler estas informações.
 * Obs. Faça pelo menos dois cadastros e não apague os dados já gravados.
 * Para a página de exibição, troque os ---- por <br/>.
 * O seu arquivo deve ficar da seguinte forma:
 * Nome: Fulano de Tal.
 * E-mail: fulano@de.tal
 * Telefone: 18 190192193
 * RG: 98765433-1
 * ---- 
 */
$msg = "";
if (filter_input(INPUT_POST, "btnGravar", FILTER_SANITIZE_STRING)) {
    $nome = filter_input(INPUT_POST, "txtNome", FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, "txtEmail", FILTER_SANITIZE_STRING);
    $telefone = filter_input(INPUT_POST, "txtTelefone", FILTER_SANITIZE_STRING);
    $rg = filter_input(INPUT_POST, "txtRG", FILTER_SANITIZE_STRING);
    
    
    if(Gravar($nome, $email, $telefone, $rg, "dados.txt")){
        $msg = "<span style='color: green;'>Dados armazenados</span>";
    }else{
        $msg = "<span style='color: red;'>Dados não armazenados</span>";
    }
}

function Gravar(string $nome, string $email, string $telefone, string $rg, string $arquivo) {
    //a = Abre somente para escrita; coloca o ponteiro do arquivo no final do arquivo. Se o arquivo não existir, tenta criá-lo.
    //http://php.net/manual/pt_BR/function.fopen.php
    $fp = fopen($arquivo, "a");

    $string = "<b>Nome:</b> {$nome} \n<b>E-mail:</b> {$email} \n<b>Telefone:</b> {$telefone} \n<b>RG:</b> {$rg} \n----\n\n";
    $fw = fwrite($fp, $string);
    fclose($fp);

    //fwrite() retorna o número de bytes escritos, ou FALSE em caso de erro.
    //http://php.net/manual/pt_BR/function.fwrite.php
    return $fw;
}
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <title>Arquivo texto</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <form method="POST">
            <label>Nome: <input type="text" name="txtNome" /></label>
            <br/> <br/>
            <label>E-mail: <input type="text" name="txtEmail" /></label>
            <br/> <br/>
            <label>Telefone: <input type="text" name="txtTelefone" /></label>
            <br/> <br/>
            <label>RG: <input type="text" name="txtRG" /></label>
            <br/> <br/>
            <input type="submit" name="btnGravar" value="Gravar" />
            <a href="ler.php">Ler</a>
        </form>
        <br />
        <p><?=$msg;?></p>
    </body>
</html>