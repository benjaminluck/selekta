<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../classmap.php';
require '../params.php';

$client = new ElasticHandler();

$indices = $client->listIndices();
$list = $client->searchIndexByBPMGroup($indices[0], 'mp3', 0);

echo "<pre>";
print_r($indices);
echo "</pre";

echo "<pre>";
foreach($list as $item){
  if(isset($item['_source']['artist']) && isset($item['_source']['title'])){
      $artist = $item['_source']['artist'];
      $title = $item['_source']['title'];
      echo $artist . ' - ' . $title . PHP_EOL;
  }
}
echo "</pre";

?>
