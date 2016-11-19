<html>
  <head>
  </head>
  <body>
    <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $json = file_get_contents("list.json");
    $array = json_decode($json);
    print_r($array);
    exit;

    $destination = "/Applications/MAMP/htdocs/index-selection/test_destination/";

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
