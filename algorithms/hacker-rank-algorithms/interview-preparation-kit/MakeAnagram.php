<?php

function makeAnagram(string $a, string $b) {
    $visited = [
        'a' => 0,
        'b' => 0,
        'c' => 0,
        'd' => 0,
        'e' => 0,
        'f' => 0,
        'g' => 0,
        'h' => 0,
        'i' => 0,
        'j' => 0,
        'k' => 0,
        'l' => 0,
        'm' => 0,
        'n' => 0,
        'o' => 0,
        'p' => 0,
        'q' => 0,
        'r' => 0,
        's' => 0,
        't' => 0,
        'u' => 0,
        'v' => 0,
        'x' => 0,
        'w' => 0,
        'y' => 0,
        'z' => 0
    ];
    $deletedCount = 0;
    $aCount = 0;
    $bCount = 0;
    
    foreach(str_split($a) as $char) {
        if(!$visited[$char]) {
            $visited[$char] = 1;
        } else {
            $visited[$char] += 1;
        }
    }
    
    foreach(str_split($b) as $char) {
        if(!!$visited[$char]) {
            $visited[$char] -= 1;
            $aCount += 1;
        } else {
            $bCount += 1;
        }
    }
    
    $deletedCount = ((strlen($a) - $aCount) + $bCount);
    
    return $deletedCount;
}
