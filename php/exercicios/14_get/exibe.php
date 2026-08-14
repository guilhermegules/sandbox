<?php

echo filter_input(INPUT_GET, "txtNome", FILTER_SANITIZE_STRING);
echo "<br/>";
echo filter_input(INPUT_GET, "txtEmail", FILTER_SANITIZE_STRING);