<?php
ini_set('display_errors', true);
error_reporting(E_ALL);

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

require 'vendor/autoload.php';

use \Slim\App;
$app = new App(['settings' => ['displayErrorDetails' => true]]);

require_once WWW_ROOT.'api_imports/auth.php';
require_once WWW_ROOT.'api_imports/users.php';
require_once WWW_ROOT.'api_imports/moestuin.php';
require_once WWW_ROOT.'api_imports/moestuinenUsers.php';
require_once WWW_ROOT.'api_imports/percelen.php';
require_once WWW_ROOT.'api_imports/planten.php';

//WRITE CODE HERE

$app->get('/api/oneliners', function ($request, $response, $args) {
  var_dump("jeet");
  /*
  $onelinerDAO = new OnelinerDAO();
  $oneliners = $onelinerDAO->selectAll();

  $view = new \Slim\Views\PhpRenderer('view/');
  $basePath = $request->getUri()->getBasePath();

  $response = $response->write(json_encode($oneliners))
    ->withHeader('Content-Type','application/json');

  if (!empty($oneliners)){
    $response = $response->withStatus(201);
  }else{
    $response = $response->withStatus(404);
  }
  return $response;*/
});

$app->delete('/api/oneliners/{id}', function($request, $response,$args){

});


$app->post('/api/oneliners', function($request, $response,$args){

});

$app->put('/api/oneliners', function($request, $response,$args){

});


$app->get('/{anything:.*}', function ($request, $response, $args) {
  $view = new \Slim\Views\PhpRenderer('view/');
  $basePath = $request->getUri()->getBasePath();
  return $view->render($response, 'home.php', ['basePath' => $basePath]);
});

$app->run();
