<?php

function pizzaTemplateHandler(string $name, array $pizzas) {
  $template = "
    <p>Bem vindo(a), $name</p>  
    <form action='#' method='POST'>
      <label for='flavor'>Sabor:</label>
      <select name='flavor'>
  ";

  foreach(array_keys($pizzas) as $flavor) {
    $template .= "<option value=$flavor>$flavor</option>";
  }

  $template .= "
    </select>
    
    <label for='price'>Preço:</label>
    <select name='price'>  
  ";

  foreach($pizzas as $price) {
    $template .= "<option value=$price>R$ $price</option>";
  }

  $template .= "
      </select>
      <input type='submit' value='Calcular valor da pizza' />
    </form>
    ";

  return $template;
}