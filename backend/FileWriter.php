<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class FileWriter
{

  public $todoJSON = '';
  public $todoArray = [];

  public $items = [];
  public $configs = [];

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

  public function __construct($todoJSON, $vaultPath, $destination, $configs, $selection = ''){
      $this->destination = $destination;
      $this->logFilePath = $this->destination .'todo.log';
      $this->todoRSYNC = $this->destination .'todo.rsync.sh';
      $this->selectedStructure = $selection;
      $this->vaultPath = $vaultPath;
      $this->configs = $configs;

      $this->todoJSON = $todoJSON;
      $this->todoArray = json_decode($this->todoJSON , true);
      $this->items = $this->initCreateTodo($this->todoArray);
  }

  public function getBPMFolder($file){
    $bpmMap = [
      '100' => '0',
      '120' => '1',
      '130' => '2',
      '145' => '3',
      '170' => '4',
      '300' => '5' 
    ];

    foreach($bpmMap as $bpmValue => $segment){ 
      if(isset($file['bpm'])){
        if($file['bpm'] < $bpmValue){
          return $segment;
        }
      }
    }

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

  public function writeToLogRsync($file, $count, $total_items, $fromVault = true){
    $targetPath = '';
    $bpmBasedFolder = false;
    if(in_array('bpm-folders',$this->configs)){
      $bpmBasedFolder = true; 
    }

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

    if($bpmBasedFolder){ 
      $rsyncOut = $this->destination . $this->selectedStructure . '/' . $structSuffix . '/' . $this->getBPMFolder($file) . '/' . $file[$this->logParams['filename']];
    }else{
      $rsyncOut = $this->destination . $this->selectedStructure . '/' . $structSuffix . '/' . $file[$this->logParams['filename']];
    }

    $rsyncOut = escapeshellarg($rsyncOut);  
    $rsyncCmd = 'rsync '.$rsyncParams.' '.$rsyncIn.' '.$rsyncOut.$closeChar;

    if($bpmBasedFolder){ 
      $makeDirCmd = 'mkdir -p '.escapeshellarg($this->destination . $this->selectedStructure . '/' .  $structSuffix . '/' . $this->getBPMFolder($file) . '/') .$closeChar;
    }else{
      $makeDirCmd = 'mkdir -p '.escapeshellarg($this->destination . $this->selectedStructure . '/' .  $structSuffix) .$closeChar;
    }
    
    //rsync --delete --verbose --ignore-existing -r --partial /Volumes/2TB\ EXT\ Western\ Digital/_AUDIO/_ONSECK/_dj\:selection/selection-v10/ /Volumes/32GB\ D/
    $statusCmd = "echo '".round(($count / $total_items * 100),2) . "% -- (".$count.'/'.$total_items.")'"; 
    file_put_contents($this->todoRSYNC, $statusCmd . PHP_EOL , FILE_APPEND | LOCK_EX);
    file_put_contents($this->todoRSYNC, $makeDirCmd . PHP_EOL , FILE_APPEND | LOCK_EX);  
    file_put_contents($this->todoRSYNC, $rsyncCmd . PHP_EOL , FILE_APPEND | LOCK_EX);
  }

  public function initCreateTodo($array){
    file_put_contents($this->logFilePath, '');
    return $this->writeTodoItems($array);
  }

  public function writeTodoItems($array){
    $items = $this->items;
    $total_items = count($array);
    $count = 0;
    foreach($array as $k1 => $v1){
      if(!isset($v1['srcPath'])){
        $this->writeTodoItems($v1);
      }
      else{
        $items[] = $v1;
        $this->writeToLogRsync($v1, $count, $total_items);
        $this->writeToLog($v1);
        $count++;
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
