<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="text/javascript">
      WebFontConfig = {
        custom: {
          families: ['Adam'],
          urls: ['<?php echo $basePath;?>/assets/fonts/adam.css']
        }
      };

      (function() {
        var wf = document.createElement('script');
        wf.src = '<?php echo $basePath;?>/js/vendor/webfontloader.min.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    </script>
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="author" content="Daphné Danneels" />
    <meta name="description" content="My personal portfolio" />
    <meta name="keywords" content="portfolio, illustration, layout, graphic, design, devine, cross, media, web, photography, motion, sketch, tattoo, daphne" />
    <title>Daphne Danneels</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="icon" type="image/png" href='<?php echo $basePath;?>/assets/favicon/favicon2.png'>
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
