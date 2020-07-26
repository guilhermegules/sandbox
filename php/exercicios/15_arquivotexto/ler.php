<?php

echo Ler("dados.txt");

function Ler(string $arquivo) {

    if (filesize($arquivo) > 0) {

        $fp = fopen($arquivo, "r");

        $content = fread($fp, filesize($arquivo));
        $content = str_replace("\n", "<br/>", $content);
        $content = str_replace("----", "<br/>", $content);

        fclose($fp);

        return $content;
    } else {
        return "";
    }
}

?>