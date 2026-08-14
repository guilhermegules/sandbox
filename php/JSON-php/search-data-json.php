<?php
$str = file_get_contents('https://jsonplaceholder.typicode.com/users');
// echo $str; show JSON data
$users = json_decode($str);

foreach($users as $user) {
  echo "<p><b>User ID: </b>".$user->id ."</p>";
  echo "<p><b>User Name: </b>". $user->name ."</p>";
  echo "<p><b>User Nickname: </b>". $user->username ."</p>";
  echo "<p><b>User Email: </b>". $user->email ."</p>";
  echo "<p><b>User Website: </b>". $user->website ."</p>";
  echo "<p><b>User Phone: </b>". $user->phone ."</p>";
  echo "<p><b>User Street: </b>". $user->address->street ."</p>";
  echo "<p><b>User Suite: </b>". $user->address->suite ."</p>";
  echo "<p><b>User City: </b>". $user->address->city ."</p>";
  echo "<p><b>User Zip: </b>". $user->address->zipcode ."</p>";
  echo "<p><b>User Company Name: </b>". $user->company->name ."</p>";
  echo "<hr>";
}

// using classic for
// for ($i = 0; $i < sizeof($users); $i++) {
//   echo "<p><b>User ID: </b>".$users[$i]->id ."</p>";
//   echo "<p><b>User Name: </b>". $users[$i]->name ."</p>";
//   echo "<p><b>User Nickname: </b>". $users[$i]->username ."</p>";
//   echo "<p><b>User Email: </b>". $users[$i]->email ."</p>";
//   echo "<p><b>User Website: </b>". $users[$i]->website ."</p>";
//   echo "<p><b>User Phone: </b>". $users[$i]->phone ."</p>";
//   echo "<p><b>User Street: </b>". $users[$i]->address->street ."</p>";
//   echo "<p><b>User Suite: </b>". $users[$i]->address->suite ."</p>";
//   echo "<p><b>User City: </b>". $users[$i]->address->city ."</p>";
//   echo "<p><b>User Zip: </b>". $users[$i]->address->zipcode ."</p>";
//   echo "<p><b>User Company Name: </b>". $users[$i]->company->name ."</p>";
//   echo "<hr>";
// }
?> 