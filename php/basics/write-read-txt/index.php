<?php
function save(string $text, string $file) {
  $fopen = fopen($file, "a+");
  fwrite($fopen, "{$text} <br>\r\n");
  fclose($fopen);
}

save(date("d/m/Y H:i:s"), "file.txt");

function read(string $file) {
  $fopen = fopen($file, "r");
  $text = fread($fopen, filesize($file));
  fclose($fopen);
  return $text;
}

echo read("file.txt");

?>