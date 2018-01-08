<?php

use Elasticsearch\ClientBuilder;

class ElasticHandler
{
  public $connection;

  public $selectedIndex = "selekta_db";

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
    $base = $base . $this->selectedIndex . '/';
    $data_string = $jsonData;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_URL, $base . $endpoint);
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
    $indexName = $this->selectedIndex;
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
    $index = $this->selectedIndex;
    $params = [
      'index' => $index,
      'type' => $type,
      'id' => $doc_id,
      'body' => $data
    ];

    $response = $this->connection->index($params);
    return $response;
  }

  public function updateTags($index, $type, $doc_id, $data = ''){
    $index = $this->selectedIndex;

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
    if (!isset($es_response['hits']['hits'])){
      return [];
    }

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
    $index = $this->selectedIndex;
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

  public function searchIndexByTags($selectionName, $type, $tags){
    $index = $this->selectedIndex;
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

  public function searchVault($type){
    $index = $this->selectedIndex;
    $size = 5000;

    $query = '{
        "size": ' . $size . '
    }';


    $results = $this->elasticPOST('_search', $query);
    $results = json_decode($results, true);
    $results = $this->formatResult($results);

    return $results;
  }

  public function searchIndex($selectionName, $type){
    $index = $this->selectedIndex;
    $size = 5000;

    $selectionNm = 'selection-v10';
    $fieldVar = 'structure' . '.' . $selectionName;

    $query = '{
        "size": ' . $size . ',
        "query": {
            "bool" : {
                "must" : {
                    "exists" : {
                        "field" : "' .$fieldVar. '"
                    }
                }
            }
        }
    }';


    $results = $this->elasticPOST('_search', $query);
    $results = json_decode($results, true);

    if(!empty($results)){
      $results = $this->formatResult($results);
    }else{
      echo $json_encode($results);
    }
    return $results;
  }

  public function bulk($params){
    $results = $this->connection->bulk($params);

    return $results;
  }

  public function updateSingleDoc($doc, $doc_type, $selectionName, $structure){
    $doc_id = $doc['hash'];
    $doc_json = json_encode($doc);
    $doc_json = substr($doc_json, 1, -1); // strip first and last { } added by json encode
    $end = $doc_type . '/' . $doc_id . '/_update';

    $payload = '{
        "script" : {
            "inline": "if(!ctx._source.structure.empty){ ctx._source.structure[params.selectionName] = params.structure}",
            "lang": "painless",
            "params" : {
                "selectionName" : "'.$selectionName .'",
                "structure" : '.json_encode($structure).'
            }
        },
        "upsert" : {'
          . $doc_json .
        '}
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
