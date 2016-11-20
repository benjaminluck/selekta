<html>
  <head>
    <meta http-equiv="refresh" content="1" >
  </head>
  <body>
    <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require 'params.php';
    define('DESTINATION', $destination);

    $json = file_get_contents("list.json");
    $array = json_decode($json, true);
  //  print_r(json_encode($array));
    $todo_list = [];

    file_put_contents(DESTINATION.'todo.log', "");

    $ct = 0;

     function walkThruDir($array){
       foreach($array as $k1 => $v1){
         if(!isset($v1['srcPath'])){
           walkThruDir($v1);
         }
         else{
           $items[] = $v1;
           file_put_contents(DESTINATION.'todo.log', $v1['srcPath'].PHP_EOL , FILE_APPEND | LOCK_EX);
           file_put_contents(DESTINATION.'todo.log', DESTINATION . $v1['fileName'].PHP_EOL, FILE_APPEND | LOCK_EX);
           file_put_contents(DESTINATION.'todo.log', '----'.PHP_EOL, FILE_APPEND | LOCK_EX);

          //  copy($v1['srcPath'], DESTINATION . $v1['fileName']);
          //  $ct++;
           //
          //  if($ct > 10){
          //    return $items;
          //  }


           //file_put_contents(DESTINATION.'todo.log', $v1['relPath'].PHP_EOL , FILE_APPEND | LOCK_EX);

          //  echo '<pre>';
          //  echo $v1['srcPath'];
          //  echo '</pre>';
         }
         // append filename to list
       }

       return $items;
         }

        $todo_list = walkThruDir($array);
      //  print_r($todo_list);

      // first get file Length
      $file = new SplFileObject(DESTINATION.'todo.log');

      while (!$file->eof()) {
          $file->fgets();
          $end = $file->ftell();
      }



        $file = new SplFileObject(DESTINATION.'todo.log');

    // Loop until we reach the end of the file.
    while (!$file->eof()) {
        // Echo one line from the file.

        $a = $file->fgets();
        $b = $file->fgets();
        $last = $file->fgets();


        // echo $a . PHP_EOL;
        // echo $b . PHP_EOL;
        // echo $last . PHP_EOL;

        if($last == '----' || $last == '---- ' ) { continue; }



        if(file_exists(rtrim($b))) { continue; }


        copy(rtrim($a), rtrim($b));
        echo ("Progress : " . round($file->ftell() / $end, 4) * 100 . '%');
      //  header("Refresh:0");
        exit();
      //  echo $a;
    }

    // Unset the file to call __destruct(), closing the file handle.
    $file = null;


    exit;



    $from = "/Applications/MAMP/htdocs/index-selection/test_unstruct/";

    $container = $array[0];
    $list = [];

    foreach($container as $key => $value){
      foreach($value as $key2 => $value2){
          if($key2 == 'content'){
            foreach($value2 as $key3 => $value3){
              if($key3 == 'content'){
                foreach($value3 as $key4 => $value4){
                  foreach($value4 as $key5 => $value5){
                    if($key5 == 'content'){
                      foreach($value5 as $key6 => $value6){
                        foreach($value6 as $key7 => $value7){
                          $list[$key7] = $value7;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
      }
    }

    //each item in $list
    //copy from item.srcPath
    //to $destination / item.songGroup / item.bpmGroup / $filename

    // write todo
    $todo = [];

    foreach($list as $item => $data){
      foreach($data as $prop => $value){
          if($prop == 'fileName'){
            $fn = $value;
            array_push($todo, $fn);
          }
        }
      }

      $json_todo = json_encode($todo);

      if(!file_exists($destination."/")){
         mkdir($destination."/", 0777, true);
      }
      file_put_contents($destination.'todo.json', $json_todo);

    // loop over items
    foreach($list as $item => $data){
      foreach($data as $prop => $value){
        $fileFrom = $from;

        if($prop == 'srcPath'){
          $from = $value;

        }

        if($prop == 'fileName'){
          $fn = $value;
        }
        if($prop == 'songGroup'){
          $sng = $value;
        }
        if($prop == 'bpmGroup'){
        //  $fileFrom = $from.$fn;

          $bpg = $value;
          if(!file_exists($destination."/".$sng."/".$bpg)){
             mkdir($destination."/".$sng."/".$bpg, 0777, true);
          }
          copy($from, $destination."/".$sng."/".$bpg."/".$fn);

          $txt = array_search($todo, $fn).' => '.$fn;
          file_put_contents($destination.'done.log', $txt.PHP_EOL , FILE_APPEND);

        }
      }

    }

     ?>
  </body>
</html>
