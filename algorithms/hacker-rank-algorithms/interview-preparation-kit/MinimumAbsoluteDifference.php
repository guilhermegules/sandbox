<?php

function minimumAbsoluteDifference($arr) 
{
    sort($arr);
    $minimumAbsoluteDifference = abs($arr[0] - $arr[1]);
   
    foreach($arr as $index => $number) {
        if($index + 1 === count($arr)) {
            break;
        }
        
        $dif = abs($number - $arr[$index + 1]);
        
        if ($dif < $minimumAbsoluteDifference) {
            $minimumAbsoluteDifference = $dif;
        }
    }
   
    return $minimumAbsoluteDifference;
}
