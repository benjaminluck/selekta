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

  public function updateDoc($params, $data){
    $indices = $this->dbClient->listIndices();
    $selectedIndex = $indices[6];
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

    $json = json_encode($newArray);

    return $json;
  }

  public function getListFromIndex(){
    $indices = $this->dbClient->listIndices();
    $selectedIndex = $indices[6];
    $selectedType = 'mp3';

    $list = $this->dbClient->searchIndex($selectedIndex, $selectedType);
    $list = $this->shapeData($list, 'bpm-song');

    return $list;
  }

  public function createList(){
    $tree = new StructuredTree($this->dir);
    $tree->buildList();
    //
    // $fileList = $tree->Array();
    //
    // print_r($tree->JSON());
    //
    // // move to write dir and put contents
    chdir($this->writeDir);
    file_put_contents('list.json', $tree->JSON());
    return $tree;
  }

}

?>
