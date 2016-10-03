<?php
ini_set('display_errors', true);
error_reporting(E_ALL);

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

require 'vendor/autoload.php';

use \Slim\App;
$app = new App(['settings' => ['displayErrorDetails' => true]]);

require_once WWW_ROOT.'api_imports/web.php';
require_once WWW_ROOT.'api_imports/graphic.php';
require_once WWW_ROOT.'api_imports/motion.php';

$app->get('/{anything:.*}', function ($request, $response, $args) {
  $view = new \Slim\Views\PhpRenderer('view/');
  $basePath = $request->getUri()->getBasePath();
  return $view->render($response, 'home.php', ['basePath' => $basePath]);
});

$app->run();
