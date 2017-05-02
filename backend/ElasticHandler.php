<?php

use Elasticsearch\ClientBuilder;

class ElasticHandler
{
  public $connection;

  public $selectedIndex = "selection-v10";

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

  private function elasticPOSTold($endpoint, $requestData = []){
    $base = $this->es_host;
    $data_string = json_encode($requestData);

    $ch = curl_init();
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

  private function elasticPOST($endpoint, $jsonData = []){
    $base = $this->es_host;
    $data_string = $jsonData;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/json',
      'Content-Length: ' . strlen($data_string))
    );

    $resp = curl_exec($ch);
    curl_close($ch);

    return $resp;
  }

  public function scrollThroughIndex($indexName, $typeName = ""){
    // read all items from an index with given 'type'
    $params = [
        "scroll" => "3s",          // how long between scroll requests. should be small!
        "size" => 500,               // how many results *per shard* you want back
        "index" => $indexName,
        "body" => [
            "query" => [
                "match_all" => new \stdClass()
            ]
        ]
    ];

    // Execute the search
    // The response will contain the first batch of documents
    // and a scroll_id
    $response = $this->connection->search($params);
    $items = [];

    // Now we loop until the scroll "cursors" are exhausted
    while (isset($response['hits']['hits']) && count($response['hits']['hits']) > 0) {
        $scroll_id = $response['_scroll_id'];
      //  print_r($response['hits']['hits']);
        foreach($response['hits']['hits'] as $item){
          $items[] = $item;
        }
        // Execute a Scroll request and repeat
        $response = $this->connection->scroll([
                "scroll_id" => $scroll_id,  //...using our previously obtained _scroll_id
                "scroll" => "30s"           // and the same timeout window
            ]
        );
    }
    // save items with new type value

    return $items;
  }

  public function updateSingleDocument($index, $type, $doc_id, $data = ''){
    $params = [
      'index' => $index,
      'type' => $type,
      'id' => $doc_id,
      'body' => $data
    ];

    $response = $this->connection->index($params);
    $json = json_encode($response);
    return $json;
  }

  public function updateTags($index, $type, $doc_id, $data = ''){
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

  public function bulk($params){
    $results = $this->connection->bulk($params);

    return $results;
  }

  public function updateSingleDoc($doc_id,$doc_type, $selectionName, $structure){
    $end = $this->selectedIndex. '/' . $doc_type . '/' . $doc_id . '/update';

    $payload = '{
        "script" : {
            "inline": "if(!ctx._source.structure.empty){ ctx._source.structure[params.selectionName] = params.structure}",
            "lang": "painless",
            "params" : {
                "selectionName" : "'.$selectionName .'",
                "structure" : '.json_encode($structure).'
            }
        }
    }';

    $result = $this->elasticPOST($end, $payload);

    return $result;
  }

  public function update($params){
    $results = $this->connection->update($params);

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
