<?php
  $req = filter_input(INPUT_GET, "req", FILTER_SANITIZE_NUMBER_INT);

  switch ($req) {
    case 1:
      create();
      break;
    case 2:
      read();
      break;
    case 3:
      update();
    break;
    case 4:
      delete();
    break;
  }

  function create() {
    echo "Create";
    setcookie("name", "Guilherme", time() + 100);
  }

  function read() {
    echo filter_input(INPUT_COOKIE, "name", FILTER_SANITIZE_STRING);
  }

  function update() {
    echo "Update";
    setcookie("name", "Guilherme Gules");
  }

  function delete() {
    echo "Delete";
    setcookie("name", "", time() + 1);
  }
?>