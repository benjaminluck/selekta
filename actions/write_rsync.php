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

    $json = file_get_contents($jsonList);

    $writer = new FileWriter($json, $destination, 'rsync');

     ?>
  </body>
</html>
