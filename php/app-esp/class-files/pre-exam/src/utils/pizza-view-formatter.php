<?php

function pizzaTemplateHandler() {
  return "
    <form action='#' method='POST'>
      <label for='flavor'>Sabor:</label>
      <input name='flavor' id='flavor' placeholder='Digite o sabor da pizza' />

      <label for='price'>Preço:</label>
      <input name='price' id='price' placeholder='Digite o valor da pizza' />

      <input type='submit' value='Calcular valor da pizza' />
    </form>
  ";
}