<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class API {

  public $dir = '';
  public $writeDir = '';
  public $destination = '';

  public function __construct($constructParams){
    // init params
    $this->dir = $constructParams['dir'];
    $this->writeDir = $constructParams['writeDir'];
    $this->destination = $constructParams['destination'];
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
