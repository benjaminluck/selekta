<html>
<head>
</head>
<body>
<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
define('STARTDIR', '/Volumes/2TB EXT Western Digital/_AUDIO/_ONSECK/_dj:selection/selection-v10/');

$writeDir = "/Applications/MAMP/htdocs/index-selection/test_src/";
//$dir = "/Volumes/2TB%20EXT%20Western%20Digital%201/_AUDIO/_ONSECK/_dj:selection/selection-v10/";
$dir = STARTDIR;
$writeDir = $dir;

chdir($dir);

$structure = [];
$tree = [];

// finish meta data artist - title
// save as json
// rebuild folder using json

function printAllFiles($dir) {
    // subdirs first
    foreach (getAllDirectories($dir) as $f) {
        printAllFiles($f); // here is the recursive call
    }
    // root dir
    foreach (getAllFiles($dir) as $f) {
        echo $f;
    }
}

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

// build first tree
$tree[$dir] = buildFolderTreeRecursive($dir, $dir);


// foreach($tree[0] as $key => $value){
//   if ($tree[0][$key]['folder']){
//     chdir($tree[0][$key]['path']);
//     // second layer
//     $tree[0][$key]['content'] = buildFolderTree($dir, $tree[0][$key]['path']);
//     foreach($tree[0][$key]['content'][0] as $key2 => $value2){
//       if($tree[0][$key]['content'][0][$key2]['folder']){
//     //   chdir($tree[0][$key]['content'][0][$key2]['folder']);
//         $tree[0][$key]['content'][0][$key2]['content'] = buildFolderTree($dir, $tree[0][$key]['content'][0][$key2]['path']);
//
//       }
//     }
//   }
// }

$json_tree = json_encode($tree);
print_r($json_tree);


chdir($writeDir);
file_put_contents('list.json', $json_tree);

 ?>
</body>
</html>
