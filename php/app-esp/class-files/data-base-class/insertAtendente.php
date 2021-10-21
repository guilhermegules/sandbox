<?php

require_once 'conexao.php';
$id = $_GET['id'];
$nome = $_GET['nome'];
$email = $_GET['email'];
$senha = $_GET['senha'];
$tipo = $_GET['tipo'];


if ($tipo === 'incluir') {
    $sql = "INSERT INTO acesso(nome,email,senha) VALUES('$nome','$email','$senha');";
    if ($conexao->query($sql) === TRUE) {
        echo "SAlvo com sucesso!";
    } else {

        echo "Erro:" . "$sql" . "<br>" . $conexao->error;
    }
}
if ($tipo === 'editar') {
    $sql = "update acesso set nome =  '$nome' ,email = '$email',senha='$senha' WHERE id =$id";
    if ($conexao->query($sql) === TRUE) {
        echo "SAlvo com sucesso!";
        header("Location: ExemploInsertAtendente.php?id=$id");
die();
    } else {

        echo "Erro:" . "$sql" . "<br>" . $conexao->error;
    }
}


if ($tipo === 'listar') {


    $sql = "select  * from acesso where nome =  '$nome' ";
    $resultado = $conexao->query($sql);
    if ($resultado->num_rows > 0) {
        echo "Registro encontrado";

        while ($coluna = $resultado->fetch_assoc()) {
            echo $coluna["id"] . "-" . $coluna["email"] . "-" . $coluna["senha"] . "<br>";
        }
    } else {
        echo "Nenhum registro encontrado!";
        
    }
}
?>
