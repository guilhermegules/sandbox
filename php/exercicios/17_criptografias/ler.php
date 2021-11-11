<?php

echo base64_decode(filter_input(INPUT_GET, "mail", FILTER_SANITIZE_STRING));
