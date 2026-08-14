<?php

require("../functions/function.php");

$isValid = userValidation("Guilherme", "123");

if($isValid) 
{
  echo "Autorizado";
  /**
   * Direto da documentação:
   * 
   * O tempo para o cookie expirar. Esse valor é uma timestamp Unix, 
   * portanto é o número de segundos desde a época (epoch). 
   * Em outras palavras, você provavelmente irá utilizar isso com a função time() mais o número de segundos que você quer que ele expire. 
   * Ou você pode utilizar a função mktime(). time()+60*60*24*30 irá configurar o cookie para expirar em 30 dias.
   * Se configurado para 0, ou omitido, o cookie irá expirar ao fim da sessao (quando o navegador fechar).
   */
  $expire = time() + 60 * 60 * 24;

  setcookie("name", "Guilherme", $expire);

  echo "<br /> Usuário " . $_COOKIE['name'];
}
else 
{
  echo "Não autorizado";
}


echo "<br /> COOKIE Array - Com todos os cookies registrados: <br /> ";
echo "<pre>";
print_r($_COOKIE);
echo "</pre>";
