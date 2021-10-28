<?php

require('../data-base-class/connection.php');

$file = $_FILES['file'];
$dirName = './uploads';
$filename = $file['name'];

if (move_uploaded_file($file['tmp_name'], "$dirName/$filename")) {
  echo "File has been moved sucessfully<br/>";
  // Update "UPDATE arquivo SET  nome_arquivo = '$file[name]', caminho_arquivo = '$dirName/$file[name]' where acesso_id = '9'";
  $sql = "INSERT INTO arquivo (acesso_id, nome_arquivo, caminho_arquivo) VALUES ('9', '$filename', '$dirName/$filename]')";
  if ($connection->query($sql)) {
    echo "Save successfully";
  } else {
    echo "Error: $sql <br/> $connection->error";
  }
} else {
  echo "File has not been moved, an error occurred";
}

echo "<pre>";
var_dump($file);
echo "</pre>";
