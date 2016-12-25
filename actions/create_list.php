<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../classmap.php';
require '../params.php';

$tree = new StructuredTree($dir);
$tree->buildList();
$fileList = $tree->Array();

print_r($tree->JSON());

// move to write dir and put contents
chdir($writeDir);
file_put_contents('list.json', $tree->JSON());
?>
