<?php
require_once 'conexao.php';

$id = $_GET['id'];


$sql = "select  * from acesso where id=$id  ";
echo  $sql;
$resultado = $conexao->query($sql);
if ($resultado->num_rows > 0) {
    echo "Registro encontrado";

    while ($coluna = $resultado->fetch_assoc()) {
        $id    = $coluna['id'];
        $nome  = $coluna['nome'];
        $email = $coluna['email'];
        $senha = $coluna['senha'];
        
    }
}    
?>
        <form name="acesso" action="insertAtendente.php" method="get">
            id<input type="text" name="id"      value="<?php echo $id?>"   > </input>    
            <br>
            nome<input type="text" name="nome"  value="<?php echo $nome?>"> </input>    
            <br>
            email<input type="text" name="email" value="<?php echo $email?>"> </input>    
            <br>
            senha<input type="text" name="senha" value="<?php echo $senha?>"> </input>    
            <br>
            
            <input type="submit" name="tipo" value="incluir"></input>   
            <input type="submit" name="tipo" value="editar"></input>   
            <input type="submit" name="tipo" value="listar"></input>   


            <table border="1">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nome</th>
                        <th>email</th>
                        <th>senha</th>
                    </tr>
                </thead>
                <tbody>
                <BR>
                <BR>
        <?php
        require_once 'conexao.php';
        $sql = "select  * from acesso  ";
        $resultado = $conexao->query($sql);
        if ($resultado->num_rows > 0) {
            echo "Registro encontrado";

            while ($coluna = $resultado->fetch_assoc()) {
                //echo $coluna["id"] . "-" . $coluna["email"] . "-" . $coluna["senha"] . "<br>";
                echo "<tr>";
                $id = $coluna['id'];
                echo "<td><a href='ExemploInsertAtendente.php?id=$id'>" . $coluna['id'] . "</td>";
                echo "<td>" . $coluna['nome'] . "</td>";
                echo "<td>" . $coluna['email'] . "</td>";
                echo "<td>" . $coluna['senha'] . "</td>";
                echo "</tr>   ";
            }
        } else {
            echo "Nenhum registro encontrado!";
        }

        ?>





        </tbody>
    </table>




</form>