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

// set content type
header('Content-type: application/json');

switch($request){
  case ($request[0] == 'params'):
    $params = [];
    $params['dir'] = $apiInstance->dir;
    $params['writeDir'] = $apiInstance->writeDir;
    $params['destination'] = $apiInstance->destination;
    $json = json_encode($params);
    print_r($json);
    break;
  case ($request[0] == 'create-list') :
      echo $tlList->JSON();
      break;
  case ($request[0] == 'create-vault') :
      $resp = $apiInstance->createIndexFromFolder();
      $json = json_encode($resp);
      print_r($json);
      break;
  case ($request[0] == 'update-doc') :
      $request_body = file_get_contents('php://input');
      $data = json_decode($request_body, true);
      $params = [
        "id" => $data['id']
      ];
      $result = $apiInstance->updateDoc($params, $data);
      print_r($result);
      break;
  case ($request[0] == 'list') :
      $request_body = file_get_contents('php://input');
      $data = json_decode($request_body, true);
      $shape = $request[1];
      // if($request[1] == 'unstructured'){
      //   $list = $apiInstance->getListFromIndex();
      //   print_r($list);
      //   break;
      // }
      $list = $apiInstance->getListFromIndex($shape);
      print_r($list);
      break;
  case ($request[0] == 'test') :
      //echo 'test';
      echo getenv('REMOTE_ADDR');;
      break;
}


exit;

?>
