<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class API {

  public $dir = '';
  public $writeDir = '';
  public $destination = '';

  private $dbClient;

  public function __construct($constructParams){
    // init params
    $this->dir = $constructParams['dir'];
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

  public function updateDoc($params, $data){
    $indices = $this->dbClient->listIndices();
    $selectedIndex = $this->dbClient->selectedIndex;
    $selectedType = 'mp3';

    // combine newTag with tags
    // if(!empty($data['tags'])){
    //   $data['tags'] = $data['tags'] . ',' . $data['newTag'];
    // }

    $resp = $this->dbClient->updateSingleDocument($selectedIndex, $selectedType, $params['id'], $data);

    return $resp;
  }

  public function shapeData($array, $type){
    switch($type){
      case 'structured':
      foreach($array as $item){

        $data = $item['_source'];
        $data['id'] = $item['_id'];
        $fileName = $data['fileName'];

        if(isset($data['structure'])){
          foreach($data['structure'] as $selectionName => $selectionVal){
            $execstring = '$newArray["'. $selectionName . '"]["' . implode('"]["', $data['structure'][$selectionName]) . '"]["'. $fileName .'"] = $data;';
            eval($execstring);
          }
        }
      }
      break;
      case 'unstructured':
      foreach($array as $item){
        $data = $item['_source'];
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
  //    echo $msg . PHP_EOL;
      return $msg;
    }

    $json = json_encode($newArray);

    return $json;
  }

  // public function getVaultFromIndex($tags = []){
  //   $indices = $this->dbClient->listIndices();
  //   $selectedIndex = $indices[6];
  //   $selectedType = 'mp3';
  //
  //
  //   if(!empty($tags){
  //     $list = $this->dbClient->searchIndexByTags($selectedIndex, $selectedType, $tags[0]);
  //   }else{
  //     $list = $this->dbClient->searchIndex($selectedIndex, $selectedType);
  //   }
  //
  //   $list = $this->shapeData($list, 'unstructured');
  //
  //   return $list;
  // }

  public function getVaultFromIndex(){
    $indices = $this->dbClient->listIndices();
    $selectedType = 'mp3';

    $list = $this->dbClient->searchIndex($this->dbClient->getSelectedIndex(), $selectedType);
    $list = $this->shapeData($list, 'unstructured');


    return $list;
  }

  public function getListFromIndex($selectedIndex, $listShape, $tags = []){
    $indices = $this->dbClient->listIndices();
    $selectedType = 'mp3';
    if(!empty($tags)){
      $list = $this->dbClient->searchIndexByTags($selectedIndex, $selectedType, $tags[0]);
    }else{
      $list = $this->dbClient->searchIndex($selectedIndex, $selectedType);
    }

    $list = $this->shapeData($list, $listShape);


    return $list;
  }

  public function duplicateSelection($targetIndex, $targetType, $sourceIndex = ''){
    // read all items from an index with given 'type'
    $index = $this->dbClient->selectedIndex;
    $resultScroll = $this->dbClient->scrollThroughIndex($index);
    $resultInsert = $this->bulkInsertFromArray($resultScroll, $targetIndex, $targetType);

    // save items with new type value

    return $list;
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
        $response = $client->updateSingleDoc($doc,'mp3', $selectionName, $fileList[$i]['structure'][$selectionName]);
        $responses[] = $response;
    }


    return $responses;
  }

  // -- delete (obsolete)
  // public function createIndexFromFolderInit(){
  //   $client = $this->dbClient;
  //   $flatList = new FlatList($this->dir, $this->dir);
  //   $flatList->buildList();
  //   $fileList = $flatList->Array();
  //   $selectionName = $flatList->getFolderName();
  //
  //   $params = ['body' => []];
  //
  //   for ($i = 0; $i < sizeof($fileList); ++$i) {
  //       $params['body'][] = [
  //           'index' => [
  //               '_index' => $selectionName,
  //               '_type' => 'mp3',
  //               '_id' => $fileList[$i]['hash'],
  //           ],
  //       ];
  //
  //       $params['body'][] = json_encode($fileList[$i]);
  //   }
  //
  //   // Send the last batch if it exists
  //   if (!empty($params['body'])) {
  //       $responses = $client->bulk($params);
  //   }
  //
  //   print_r($responses);
  //
  //   return $responses;
  //
  // }

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
