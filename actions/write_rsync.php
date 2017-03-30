<html>
  <head>
    <meta http-equiv="refresh" content="60" >
  </head>
  <body>
    <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require '../classmap.php';
    require '../params.php';

    define('DESTINATION', $destination);

    $params = [
      'dir' => $dir,
      'writeDir' => $writeDir,
      'destination' => $destination
    ];
    $shape = "unstructured";
    $apiInstance = new API($params);

  //  $json = file_get_contents("../list.json");
    $json = $apiInstance->getListFromIndex($shape);

    $writer = new FileWriter($json, $destination, 'rsync');

     ?>
  </body>
</html>
