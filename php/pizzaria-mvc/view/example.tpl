<html>
{include file="head.tpl"}

<body>
  {$name|lower}
  {$name|upper}
  {$name|truncate:10:"..."|upper}

  {foreach from=$list item=item_nome}
    nomes: {$item_nome}<br>
  {/foreach}

</body>
<html>