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

  private $es_host = "http://localhost:9200/";

  private function elasticGET($endpoint){
    $base = $this->es_host;

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $base.$endpoint
    ));
    $resp = curl_exec($curl);
    curl_close($curl);

    return $resp;
  }

  private function elasticPOST($endpoint, $requestData = []){
    $base = $this->es_host;
    $data_string = json_encode($requestData);

    $curl = curl_init();
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/json',
      'Content-Length: ' . strlen($data_string))
    );

    $resp = curl_exec($curl);
    curl_close($curl);

    return $resp;
  }

  public function updateSingleDocument($index, $type, $doc_id, $data = ''){
        $params = [
        'index' => $index,
        'type' => $type,
        'id' => $doc_id,
        'body' => [
            'script' => "ctx._source.tags = " ."'".$data."'",
            'params' => [
                'tags' => $data
            ]
        ]
    ];

    $response = $this->connection->update($params);

    return $response;
  }

  public function formatResult($es_response){
    // takes a regular search response and only extracts the hits
    return $es_response['hits']['hits'];
  }

  public function listTagsByIndex($index, $type){
    $res = $this->searchIndex($index, $type);
    $tags = [];

    foreach($res as $item){
      if(isset($item['_source']['tags'])){
        $tg = $item['_source']['tags'];
        if(isset($tags[$tg])){
          $tags[$tg]++;
        }else {
          $tags[$tg] = 1;
        }
      }
    }

    return $tags;
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

  public function searchIndexByTags($index, $type, $tags){
    $q = [
          'query' => [
              'match' => [
                  'tags' => $tags
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

    if(!empty($indices)){
      return $indices;
    }

    return "No indicies found.";
  }

}

?>
