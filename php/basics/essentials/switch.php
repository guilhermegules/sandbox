<?php
  $option = 2;

  switch($option) {
    case 1:
      echo "Option 1";
    break;
    case 2:
      echo "Option 2";
    break;
    default:
    echo "Default option";
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Testing switch</title>
</head>
<body>
  <p>Hello, option selected: <?=$option; ?></p>
</body>
</html>