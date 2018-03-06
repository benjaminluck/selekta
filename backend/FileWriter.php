<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class FileWriter
{

  public $todoJSON = '';
  public $todoArray = [];

  public $items = [];

  public $logFilePath = '';
  public $logParams = [
    "filename" => 'fileName',
    "rel_path" => 'relPath',
    "flat" => false
  ];
 
  public function getRsyncFileDestination(){
    return $this->todoRSYNC;
  }

  public $destination = '';

  public function __construct($todoJSON, $vaultPath, $destination, $selection = ''){
      $this->destination = $destination;
      $this->logFilePath = $this->destination .'todo.log';
      $this->todoRSYNC = $this->destination .'todo.rsync.sh';
      $this->selectedStructure = $selection;
      $this->vaultPath = $vaultPath;

      $this->todoJSON = $todoJSON;
      $this->todoArray = json_decode($this->todoJSON , true);
      $this->items = $this->initCreateTodo($this->todoArray);
  }

  public function writeToLog($file){
    $dest = $file[$this->logParams['rel_path']];

    if(!empty($this->selectedStructure)){
        $structure = $file['structure'][$this->selectedStructure];
    }

    if(!empty($file['structure'])){
      $structSuffix = implode('/',$structure);
      $dest = $structSuffix .  $file[$this->logParams['filename']];
    }

    if($this->logParams['flat']){
      $dest = $file[$this->logParams['filename']];
    }

    file_put_contents($this->logFilePath, $file['srcPath'].PHP_EOL , FILE_APPEND | LOCK_EX);
    file_put_contents($this->logFilePath, $this->destination  . $dest.PHP_EOL, FILE_APPEND | LOCK_EX);
    file_put_contents($this->logFilePath, '----'.PHP_EOL, FILE_APPEND | LOCK_EX);
  }

  public function writeToLogRsync($file, $fromVault = true){
    $targetPath = '';

    if(!empty($this->selectedStructure)){
        $structure = $file['structure'][$this->selectedStructure];
    }

    if(empty($structure)){
      return false;
    }

    $structSuffix = implode('/',$structure);
    $closeChar = ';';
    $rsyncParams = '--delete --verbose --ignore-existing -r --partial';
    $rsyncParams = '--verbose -r --partial';

    if($fromVault){
      $rsyncIn = $this->vaultPath . $file['fileName'];
    }else{
      $rsyncIn = $file['srcPath'];
    }

    $rsyncIn = escapeshellarg($rsyncIn);
    $rsyncOut = $this->destination . $structSuffix . '/' . $file[$this->logParams['filename']];
    $rsyncOut = escapeshellarg($rsyncOut);
    $rsyncCmd = 'rsync '.$rsyncParams.' '.$rsyncIn.' '.$rsyncOut.$closeChar;
    $makeDirCmd = 'mkdir -p '.escapeshellarg($this->destination . $structSuffix) .$closeChar;
    //rsync --delete --verbose --ignore-existing -r --partial /Volumes/2TB\ EXT\ Western\ Digital/_AUDIO/_ONSECK/_dj\:selection/selection-v10/ /Volumes/32GB\ D/
    file_put_contents($this->todoRSYNC, $makeDirCmd . PHP_EOL , FILE_APPEND | LOCK_EX);
    file_put_contents($this->todoRSYNC, $rsyncCmd . PHP_EOL , FILE_APPEND | LOCK_EX);
  }

  public function initCreateTodo($array){
    file_put_contents($this->logFilePath, '');
    return $this->writeTodoItems($array);
  }

  public function writeTodoItems($array){
    $items = $this->items;
    foreach($array as $k1 => $v1){
      if(!isset($v1['srcPath'])){
        $this->writeTodoItems($v1);
      }
      else{
        $items[] = $v1;
        $this->writeToLogRsync($v1);
        $this->writeToLog($v1);
      }
      // append filename to list
    }

    return $items;
  }

  public function writeFilesToDestination(){
    // first get file Length
    $file = new SplFileObject($this->logFilePath);

    while (!$file->eof()) {
        $file->fgets();
        $end = $file->ftell();
    }

    $file = new SplFileObject($this->logFilePath);

    // start the file-reading loop
    $count = 0;
    while (!$file->eof()) {
        if($count >10){
          exit();
        }
        $a = $file->fgets();
        $b = $file->fgets();
        $last = $file->fgets();

        if($last == '----' || $last == '---- ' ) { continue; }
        if(file_exists(rtrim($b))) { continue; }

        // check destination dir if it doesn't exist
        if (!is_dir(dirname($b))) {
          mkdir(dirname($b), 0777, true);
        }

        copy(rtrim($a), rtrim($b));
        echo ("Progress : " . round($file->ftell() / $end, 4) * 100 . '%');
        // unset $file handler & exit loop
        // since this is a verrrryyy looong while loop, only run it once and rely on the call being repeated
        $file = null;
        $count++;
    }
  }

}
?>
