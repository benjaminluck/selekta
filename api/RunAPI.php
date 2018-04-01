<?php

require '../classmap.php';
require '../params.php';

header('Access-Control-Allow-Origin: *');

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
  'destination' => $destination,
  'prevaultDir' => $prevaultDir
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
  case ($request[0] == 'delete-vault') :
    $resp = $apiInstance->deleteVault();
    print_r($resp); 
    break;  
  case ($request[0] == 'create-rsync-list') :
    $selectionName = $request[1];
    $shape = 'unstructured'; 
    $list = $apiInstance->getListFromIndex($selectionName, $shape);
    $configs = [];

    if($request[2] == 'bpm-folders'){
      $configs[] = $request[2];
    } 

    $writer = new FileWriter($list, $vaultDir, $destination, $configs, $selectionName); 
    echo json_encode($writer->getRsyncFileDestination());
    break;    
  case ($request[0] == 'create-list') :
      echo $tlList->JSON();
      break;
  case ($request[0] == 'create-vault') :
      $resp = $apiInstance->createIndexFromFolder();
      $json = json_encode($resp);
      print_r($json);
      break;
      return $resp;
  case ($request[0] == 'index-prevault') :
      $resp = $apiInstance->updateVaultFromPrevault();
      $json = json_encode($resp);
      print_r($json);
      break;
      return $resp;    
  case ($request[0] == 'duplicate-selection') :
      $resp = $apiInstance->duplicateSelection('test-duplicate', 'mp3');
      $json = json_encode($resp);
      print_r($json);
      break;
  case ($request[0] == 'remove-selection') :
      $request_body = file_get_contents('php://input');
      $data = json_decode($request_body, true);


      $resp = $apiInstance->removeSelection($data['selection-name']);
      $json = json_encode($resp);
      print_r($json);
      break;
  case ($request[0] == 'update-doc') : 
      $request_body = file_get_contents('php://input');
      $data = json_decode($request_body, true);

      $result = $apiInstance->updateDoc($data);
      print_r($result);
      break;
  case ($request[0] == 'vault') : 
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);
        $tags = [];

        if(!empty($request[1])){
          $tags = explode('&',$request[1]);
          $list = $apiInstance->getVaultFromIndex($tags);
          print_r($list);
          break;
        }
      
        $list = $apiInstance->getVaultFromIndex();

        print_r($list);
        break;
  case ($request[0] == 'list-selections') :
        $selections = $apiInstance->getSelections();
        $selections = json_encode($selections);
        echo $selections;
        break;
  case ($request[0] == 'list') :
      $request_body = file_get_contents('php://input');
      $data = json_decode($request_body, true);


      if(empty($request[1])){
        echo 'Please define a selection';
        return false;
      }
      $selectionName = $request[1];

      if(empty($request[2])){
        echo 'Please define a list shape';
        return false;
      }
      $shape = $request[2];

      if(!empty($request[3])){
        $tags[] = $request[3];
        $list = $apiInstance->getListFromIndex($selectionName, $shape, $tags);
      }else{
        $list = $apiInstance->getListFromIndex($selectionName, $shape);
        echo $list; 
      }

      // OBSOLETE? -> DELETE
      if($request[1] == 'unstructured'){
        $list = $apiInstance->getListFromIndex();
        break;
      }
      // 

      break;
  case ($request[0] == 'write-todo') :
      $request_body = file_get_contents('php://input');
      $data = json_decode($request_body, true);

      if(empty($request[1])){
        echo 'Please define a selection';
        return false;
      }

      if(empty($request[2])){
        echo 'Please define a shape';
        return false;
      }

      $selection = $request[1];
      $shape = $request[2];


      if($shape){
          $result = $apiInstance->writeRsync($selection, $shape);
      }

      print_r($result);
      return true;
      break;
  case ($request[0] == 'test') :
      //echo 'test';
      echo getenv('REMOTE_ADDR');;
      break;
}


exit;

?>
