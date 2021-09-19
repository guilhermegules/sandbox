<?php

function userAuth(string $name, string $pass) {
  return $name === "Guilherme" && $pass === "123";
}