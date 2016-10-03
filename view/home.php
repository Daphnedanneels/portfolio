<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- <script type="text/javascript">
    WebFontConfig = {
      google: { families: [ 'Arvo:400:latin' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })(); </script> -->
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="author" content="Jonas Devacht" />
    <meta name="description" content="Moestuinbeheerder is een webpapp om je moestuin te beheren" />
    <meta name="keywords" content="moestuin, planten, oogsten, kweken, app" />
    <title>Daphne Danneels</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" type="text/css" href="<?php echo $basePath;?>/css/style.css"/>
  </head>
  <body class="body">
    <div class="react-app">
    </div>
    <script>
    window.app = window.app || {};
    window.app.basename = '<?php echo $basePath;?>';
    </script>
    <script src="<?php echo $basePath;?>/js/script.js"></script>
    <script>history.forward();</script>
  </body>
</html>
