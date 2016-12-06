<html>
<head>
  <?php
    include 'params.php';

   ?>
  <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery.jsonview.min.js"></script>
  <script type="text/javascript">
  var list = <?php echo file_get_contents(STARTDIR . "list.json"); ?>;
    $(function() {
      console.log(list);
      $("#list").JSONView(list);
    });
  </script>
</head>
<body>
 <div id="list"></div>
</body>
</html>
