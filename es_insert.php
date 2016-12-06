<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'vendor/autoload.php';
require 'backend/FileList.php';
require 'backend/FlatList.php';
require 'backend/StructuredTree.php';
require 'params.php';

use Elasticsearch\ClientBuilder;

$client = ClientBuilder::create()->build();
$flatList = new FlatList($dir, $dir);
$flatList->buildList();
$fileList = $flatList->Array();
$selectionName = $flatList->getFolderName();


// // move to  read dir
// echo $dir;
// chdir($dir);

// // init vars
// $structure = [];
// $tree = [];

// // build and format tree
// //$tree[$dir] = buildFolderTreeRecursive($dir, $dir);
// //$out = listRecursive($dir, $dir);
// //$json_tree = json_encode($tree);

// // print tree

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

// move to write dir and put contents
chdir($writeDir);
//file_put_contents('list.json', $json_tree);

// insert into elastic
;
