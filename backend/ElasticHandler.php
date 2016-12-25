<?php

use Elasticsearch\ClientBuilder;

class ElasticHandler
{
  public $connection;

  public function __construct(){
    $this->connection = ClientBuilder::create()->build();

  }

  private $ignoredIndices = [
    ".kibana",
    "cat"
  ];

  private function elasticGET($endpoint){
    $base = "http://localhost:9200/";
  //  $endpoint = '_cat/indices/';

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $base.$endpoint
    ));
    $resp = curl_exec($curl);
    curl_close($curl);

    return $resp;
  }

  public function formatResult($es_response){
    // takes a regular search response and only extracts the hits
    return $es_response['hits']['hits'];
  }

  public function searchIndexByBPMGroup($index, $type, $bpmGroup){
    $q = [
          'query' => [
              'match' => [
                  'bpmGroup' => $bpmGroup
              ]
          ]
        ];


    $res = $this->searchIndex($index, $type, $q);

    return $res;
  }

  public function searchIndex($index, $type, $query = []){
    $size = 5000;
    $params = [
        'index' => $index,
        'type' => $type,
        'size' => $size,
        'body' => $query
    ];

    //$params['body'] = [];


    $results = $this->connection->search($params);
    $results = $this->formatResult($results);

    return $results;
  }

  public function listIndices(){
    $resp = $this->elasticGET('_cat/indices/');

    $stripped = explode('yellow open', $resp);

    foreach($stripped as $item){
      $structured[] = explode(' ', $item);
    }

    foreach($structured as $piece){
      $skip = false;
      // skip if index name not on [1]
      if(empty($piece[1])){
        continue;
      }

      // skip if index name is on ignoreList
      foreach($this->ignoredIndices as $k => $v){
        if($piece[1] == $v){
          $skip = true;
        }
      }

      if(!$skip){
        $indices[] = $piece[1];
      }
    }

    return $indices;
  }

}

?>
