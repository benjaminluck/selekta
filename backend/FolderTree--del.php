<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function buildFolderTreeRecursive($orgdir, $startDir){
  chdir($orgdir);
  $tree = [];
  if (is_dir($startDir)){
    if ($dhandler = opendir($startDir)){
      $items = [];
      while (($file = readdir($dhandler)) !== false){
        if($file != '..'
        && $file != '.'
        && $file != '.DS_Store'
        && $file != 'index.php'
        && $file != '.com.greenworldsoft.syncfolderspro'
        && $file != 'README.md'
        && $file != 'list.json'
        && $file != '__readme.rtf'){
        //  $items[$file]['folder'] = false;

          if(is_dir($file)){
            // logic if file being read is a directory
        //    $items[$file]['folder'] = true;
        //    $items[$file]['path'] = $startDir.$file.'/';

            // including '/' in key makes sure that the result is json_encoded to an object, not an array (to perserve numeric foldernames in structure)
            $items['/' . $file] = buildFolderTreeRecursive($orgdir.$file.'/', $startDir.$file.'/');
            chdir($orgdir);

          }
          else{
            $items[$file]['srcPath'] = $startDir.$file;
            $items[$file]['relPath'] = str_replace(STARTDIR, "", $items[$file]['srcPath']);
            $items[$file]['fileName'] = $file;
            $meta = pathinfo($items[$file]['srcPath']);
            $items[$file]['ext'] = $meta['extension'];
            if($items[$file]['ext'] == "mp3" || $items[$file]['ext'] == "aiff" || $items[$file]['ext'] == "aif" || $items[$file]['ext'] == "m4a"){
              $folder_array = explode("/", $items[$file]['workingPath']);
              $file_array = explode(" ", $file);
              $items[$file]['songGroup'] = $folder_array[0];
              $items[$file]['key'] = $file_array[0];
              $items[$file]['bpm'] = $file_array[1];
              $items[$file]['bpmGroup'] = $folder_array[1];
              $stripe_location = array_search("-",$file_array);
              //$items[$file]['fileArr'] = $file_array;
              //$items[$file]['stripe_location'] = $stripe_location;

              // from [2] to [$stripe_location - 1]
              for($a = 2; $a < $stripe_location; $a++){
                if($file_array[$a] == '(V)' || $file_array[$a] == '(C)' || $file_array[$a] == '(VINYL)' || $file_array[$a] == '(CASS)'){
                  $items[$file]['medium'] = $file_array[$a];
                  continue;
                }
                $items[$file]['artist'] .= $file_array[$a];
                $items[$file]['artist'] .= ' ';
              }
              $items[$file]['artist'] = rtrim($items[$file]['artist']);
              for($b = $stripe_location + 1; $b < sizeof($file_array); $b++){
                $items[$file]['title'] .= $file_array[$b];
                $items[$file]['title'] .= ' ';
              }
              $items[$file]['title'] = rtrim(str_replace(".".$items[$file]['ext'],"", $items[$file]['title']));
            }

          }
        }
      }
      //$tree = $items;
      array_push($tree, $items);
      closedir($dhandler);
    }
  }
//  chdir($startDir):
  return $tree;
}

function listRecursive($orgdir, $startDir){
  global $fileList;
  chdir($orgdir);
  $tree = [];
  $list = [];
  if (is_dir($startDir)){
    if ($dhandler = opendir($startDir)){
      $items = [];
      while (($file = readdir($dhandler)) !== false){
        if($file != '..'
        && $file != '.'
        && $file != '.DS_Store'
        && $file != 'index.php'
        && $file != '.com.greenworldsoft.syncfolderspro'
        && $file != 'README.md'
        && $file != 'list.json'
        && $file != '__readme.rtf'){
        //  $items[$file]['folder'] = false;

          if(is_dir($file)){
            // logic if file being read is a directory
        //    $items[$file]['folder'] = true;
        //    $items[$file]['path'] = $startDir.$file.'/';

            // including '/' in key makes sure that the result is json_encoded to an object, not an array (to perserve numeric foldernames in structure)
            $items['/' . $file] = listRecursive($orgdir.$file.'/', $startDir.$file.'/');
            chdir($orgdir);

          }
          else{
            $items[$file]['srcPath'] = $startDir.$file;
            $items[$file]['relPath'] = str_replace(STARTDIR, "", $items[$file]['srcPath']);
            $items[$file]['fileName'] = $file;
            $meta = pathinfo($items[$file]['srcPath']);
            $items[$file]['ext'] = $meta['extension'];
            if($items[$file]['ext'] == "mp3" || $items[$file]['ext'] == "aiff" || $items[$file]['ext'] == "aif" || $items[$file]['ext'] == "m4a"){
              $folder_array = explode("/", $items[$file]['workingPath']);
              $file_array = explode(" ", $file);
              $items[$file]['songGroup'] = $folder_array[0];
              $items[$file]['key'] = $file_array[0];
              $items[$file]['bpm'] = $file_array[1];
              $items[$file]['bpmGroup'] = $folder_array[1];
              $stripe_location = array_search("-",$file_array);
              //$items[$file]['fileArr'] = $file_array;
              //$items[$file]['stripe_location'] = $stripe_location;

              // from [2] to [$stripe_location - 1]
              for($a = 2; $a < $stripe_location; $a++){
                if($file_array[$a] == '(V)' || $file_array[$a] == '(C)' || $file_array[$a] == '(VINYL)' || $file_array[$a] == '(CASS)'){
                  $items[$file]['medium'] = $file_array[$a];
                  continue;
                }
                $items[$file]['artist'] .= $file_array[$a];
                $items[$file]['artist'] .= ' ';
              }
              $items[$file]['artist'] = rtrim($items[$file]['artist']);
              for($b = $stripe_location + 1; $b < sizeof($file_array); $b++){
                $items[$file]['title'] .= $file_array[$b];
                $items[$file]['title'] .= ' ';
              }
              $items[$file]['title'] = rtrim(str_replace(".".$items[$file]['ext'],"", $items[$file]['title']));
            }

            $fileList[] = $items[$file];

          }
        }
      }
      //$tree = $items;
      array_push($tree, $items);
      closedir($dhandler);
    }
  }
//  chdir($startDir);
  return $tree;
}

 ?>
