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
      case 'regular':
      foreach($array as $item){

        $data = $item['_source'];
        $fileName = $data['fileName'];

        if(isset($data['structure'])){
        $execstring = '$newArray["' . implode('"]["', $data['structure']) . '"]["'. $fileName .'"] = $data;';
        eval($execstring);
        }
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

    $json = json_encode($newArray);

    return $json;
  }

  public function getListFromIndex(){
    $indices = $this->dbClient->listIndices();
    $selectedIndex = $indices[6];
    $selectedType = 'mp3';

    $list = $this->dbClient->searchIndex($selectedIndex, $selectedType);
    $list = $this->shapeData($list, 'regular');

    return $list;
  }

  public function createIndexFromFolder(){
    $client = $this->dbClient;
    $flatList = new FlatList($this->dir, $this->dir);
    $flatList->buildList();
    $fileList = $flatList->Array();
    $selectionName = $flatList->getFolderName();

    $params = ['body' => []];

    for ($i = 0; $i < sizeof($fileList); ++$i) {
        $params['body'][] = [
            'index' => [
                '_index' => $selectionName,
                '_type' => 'mp3',
                '_id' => $i,
            ],
        ];

        $params['body'][] = json_encode($fileList[$i]);
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
