<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class API { 

  public $dir = '';
  public $writeDir = '';
  public $destination = '';

  private $currentStructureDepth = 0;
  private $structureDepth = 0;
  private $structure = [];

  private $dbClient;

  public function __construct($constructParams){
    // init params
    $this->dir = $constructParams['dir']; 
    $this->prevaultDir = $constructParams['prevaultDir'];
    $this->writeDir = $constructParams['writeDir'];
    $this->destination = $constructParams['destination'];
    $this->dbClient = new ElasticHandler();
  }

  public function getSelectedIndex(){
    return $this->dbClient->selectedIndex;
  }

  public function writeRsync($selection, $shape){
    $indexToSelect = $this->dbClient->selectedIndex;
    $json = $this->getListFromIndex($indexToSelect,$shape);
    $writer = new FileWriter($json, $this->destination, $selection);

    return $json;
  }

  public function updateDoc($data){
    $selectedType = 'mp3'; 
    $resp = $this->dbClient->upsertSingleDoc($data['document'], $selectedType, $data['new-selection-name'], $data['new-structure'], $data['new-tags']);

    return $resp;
  }

  public function shapeDataAsNumeric($array){
    $numericArr = [];
    $levelDepth = $this->structureDepth;
    foreach($array as $firstKeys => $firstValues){
            //$folder = ["folder_name" => $firstKeys, "folder_contents" => is_array($firstValues) ? $this->shapeDataAsNumeric($firstValues) : $firstValues];
            if(is_array($firstValues)){
                if(isset($firstValues['hash'])){
                    $node = ["node_type" => 'file', "node_name" => $firstKeys, "node_contents" => $firstValues];
                }else{
                    $node = ["node_type" => 'folder', "node_name" => $firstKeys, "node_contents" => $this->shapeDataAsNumeric($firstValues)];
                }
            };
          //  $node = ["node_type" => 'folder', "node_name" => $firstKeys, "node_contents" => $firstValues];
            array_push($numericArr, $node);
          } 

    return $numericArr;
  }

  public function shapeData($array, $type){
    switch($type){
      case 'structured':
      foreach($array as $item){

        $data = $item['_source'];
        if(empty($data['fileName'])){
          continue;
        }

        $data['id'] = $item['_id'];
        $fileName = $data['fileName'];

        if(isset($data['structure'])){
          foreach($data['structure'] as $selectionName => $selectionVal){
            $this->structureDepth = sizeof($data['structure'][$selectionName]); 
            $execstring = '$newArray["'. $selectionName . '"]["' . implode('"]["', $data['structure'][$selectionName]) . '"]["'. $fileName .'"] = $data;';
            eval($execstring);
          }
        }
      }
      break;
      case 'unstructured':
      
      foreach($array as $item){
        $data = $item['_source'];
        if(empty($data['fileName'])){
          continue;
        }
        $data['id'] = $item['_id'];
        $fileName = $data['fileName'];
        $newArray[] = $data;
      }
  
      break;
        case 'song-bpm':
          foreach($array as $item){
              if(isset($item['_source']['songGroup']) && isset($item['_source']['bpmGroup'])){
                $one = $item['_source']['songGroup'];
                $two = $item['_source']['bpmGroup'];
                $data = $item['_source'];
                $data['id'] = $item['_id'];
                $fileName = $data['fileName'];

                $newArray[$one][$two][$fileName] = $data;
              }
          }
        break;
      case 'bpm-song':
        foreach($array as $item){ 
            if(isset($item['_source']['songGroup']) && isset($item['_source']['bpmGroup'])){
              $one = $item['_source']['bpmGroup'];
              $two = $item['_source']['songGroup'];;
              $data = $item['_source'];
              $data['id'] = $item['_id'];
              $fileName = $data['fileName'];

              $newArray[$one][$two][$fileName] = $data;
            }
        }
      break; 
    }

    if(empty($newArray)){
      $msg = 'No data found for selected parameters.';
      return $msg;
    }

    $json = json_encode($newArray);
    return $json;
  }

  public function getVaultFromIndex($tags = []){
    $indices = $this->dbClient->listIndices();
    $selectedType = 'mp3'; 

    $list = $this->dbClient->searchVault($selectedType, $tags);
    $list = $this->shapeData($list, 'unstructured');


    return $list;
  } 

  public function deleteVault(){
    $res = $this->dbClient->deleteVault(); 
    return $res;
  }

  public function getListFromIndex($selectionName, $listShape, $tags = []){
    $indices = $this->dbClient->listIndices();
    $selectedType = 'mp3';
    if(!empty($tags)){
      $list = $this->dbClient->searchIndexByTags($selectionName, $selectedType, $tags[0]);
    }else{
      $list = $this->dbClient->searchIndex($selectionName, $selectedType);
    }
    
    $list = $this->shapeData($list, $listShape);

    return $list;
  }

  public function getSelections(){
    $indices = $this->dbClient->listIndices();
    $selectedIndex = $this->getSelectedIndex();
    $selectedType = 'mp3';
    $list = $this->dbClient->searchVault($selectedIndex, $selectedType);
    $list = $this->shapeData($list, 'structured');
    $list = json_decode($list);
    $selections = [];
    foreach($list as $selectionName => $selectionValues){
      $selections[] = $selectionName;
    }

    return $selections;
  }

  public function duplicateSelection($targetIndex, $targetType, $sourceIndex = ''){
    // read all items from an index with given 'type'
    $index = $this->dbClient->selectedIndex;
    $resultScroll = $this->dbClient->scrollThroughIndex($index);
    $resultInsert = $this->bulkInsertFromArray($resultScroll, $targetIndex, $targetType);

    // save items with new type value

    return $list;
  }

  public function removeSelection($selectionName){
    // read all items from an index with given 'type'
    $resp = $this->dbClient->removeSelection($selectionName);

    return $resp;
  }
 
  public function createIndexFromFolder(){
    $client = $this->dbClient;
    $flatList = new FlatList($this->dir, $this->dir);
    $flatList->buildList();
    $fileList = $flatList->Array();
    $selectionName = $flatList->getFolderName();

    $responses = [];

    for ($i = 0; $i < sizeof($fileList); ++$i) {
        $doc = $fileList[$i];
        if(empty($fileList[$i]['structure'][$selectionName])){
          $fileList[$i]['structure'][$selectionName] = [1,2,3];
        }
        $response = $client->upsertSingleDoc($doc,'mp3', $selectionName, $fileList[$i]['structure'][$selectionName]);
        $responses[] = $response;
    }


    return $responses;
  }

  public function updateVaultFromPrevault(){
    $client = $this->dbClient;
    $flatList = new FlatList($this->prevaultDir);
    $flatList->buildList();
    $fileList = $flatList->Array();
    $selectionName = $flatList->getFolderName();

    $responses = [];

    for ($i = 0; $i < sizeof($fileList); ++$i) {
        $doc = $fileList[$i];

        // move files from prevault to vault folder
        $path_a = $this->prevaultDir . '/' . $doc['fileName'];
        $path_b = str_replace('_prevault','_vault', $path_a); 
        rename($path_a,$path_b);
        //

        $response = $client->upsertSingleDoc($doc,'mp3');
        $responses[] = $response; 
    }


    return $responses;
  }

  public function bulkInsertFromArray($inputArray, $targetIndex = '', $targetType = ''){
    $client = $this->dbClient;

    $params = ['body' => []];

    for ($i = 0; $i < sizeof($inputArray); ++$i) {
        $params['body'][] = [
            'index' => [
                '_index' => $targetIndex,
                '_type' => $targetType,
                '_id' => $i,
            ], 
        ];

        $params['body'][] = json_encode($inputArray[$i]["_source"]);
    }

    // Send the last batch if it exists
    if (!empty($params['body'])) {
        $responses = $client->bulk($params);
    }

    print_r($responses);

    return $responses;

  }


  public function createList(){
    $tree = new StructuredTree($this->dir);
    $tree->buildList();

    chdir($this->writeDir);
    file_put_contents('list.json', $tree->JSON());

    return $tree;
  }

}

?>
