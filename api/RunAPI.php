<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../classmap.php';
require '../params.php';

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = [];
if(!empty($_SERVER['PATH_INFO'])){
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
}
//$input = json_decode(file_get_contents('php://input'),true);

$params = [
  'dir' => $dir,
  'writeDir' => $writeDir,
  'destination' => $destination
];

$apiInstance = new API($params);
$tlList = $apiInstance->createList();

switch($request){
  case ($request[0] == 'list') :
      echo $tlList->JSON();
      break;
}


exit;

?>
