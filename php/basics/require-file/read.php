<?php
function read(string $file) {
  $fopen = fopen($file, "r");
  $text = fread($fopen, filesize($file));
  fclose($fopen);
  return $text;
}
?>