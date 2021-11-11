<?php

namespace App\Utils;

class View 
{

  public static function render(string $view, array $vars = []) 
  {
    $contentView = self::getContentView($view);

    $keys = array_keys($vars);
    $keys = array_map(function($item) {
      return "{{ $item }}";
    }, $keys);

    return str_replace($keys, array_values($vars), $contentView);
  }

  private static function getContentView(string $view)  
  {
    $file = __DIR__ . '/../../resources/view/' . $view . '.html';

    return file_exists($file) ? file_get_contents($file) : '';
  }
}