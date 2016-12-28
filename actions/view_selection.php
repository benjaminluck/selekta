<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../classmap.php';
require '../params.php';

$client = new ElasticHandler();

$indices = $client->listIndices();
$selectedIndex = $indices[6];
$selectedType = 'mp3';

$list = $client->searchIndex($selectedIndex, $selectedType);
if(!empty($_GET['tag'])){
$searchTags = $_GET['tag'];
$list = $client->searchIndexByTags($selectedIndex, $selectedType, $searchTags);
}


$tags = $client->listTagsByIndex($selectedIndex, $selectedType);

if(!empty($_POST["tag"])){
  var_dump($_POST);
  $tags = $_POST["tag"];

  $resp = $client->updateSingleDocument($selectedIndex, $selectedType, $_POST["id"], $tags);
  print_r($resp);
}

echo "<pre>";
print_r($indices);
echo "</pre";

echo "<pre>";
print_r($tags);
echo "</pre";

echo "<pre>";
foreach($list as $item){
  if(isset($item['_source']['artist']) && isset($item['_source']['title'])){
      $id = $item['_id'];
      $artist = $item['_source']['artist'];
      $title = $item['_source']['title'];
      $tag = '';
      if(isset($item['_source']['tags'])){ $tag = $item['_source']['tags']; }
      ?>
      <table>
        <tr>
          <td><?php echo '[' . $id . ']'; ?></td>
          <td><?php echo $artist; ?></td>
          <td> - </td>
          <td><?php echo $title; ?></td>
          <td style="background-color:yellow;"><?php echo $tag ?></td>
          <td><form action="view_selection.php" method="post">
              Tag: <input type="text" name="tag"><br>
                   <input style="display:none" type="text" name="id" value="<?php echo $id; ?>"></span>
          </td>
          <td>
              <input type="submit" value="updateTag">
            </form>
          </td>
        </tr>
      </table>
      <?php
      $artist = $item['_source']['artist'];
      $title = $item['_source']['title'];
  }
}
echo "</pre";

?>
