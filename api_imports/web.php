<?php

require WWW_ROOT.'dao'.DS.'WebDAO.php';

$app->get('/api/web', function($request, $response, $args){

  $webDAO = new WebDAO();

  $params = $request->getQueryParams();

  if($params['count']){
    $web = $webDAO->countProjects();
  } else {
    $web = $webDAO->selectAll();
  }

  if (empty($web)){
    $errors['errors'] = "er zijn geen web gevonden";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
    return $response;
  }else{

  $response->getBody()->write(json_encode($web));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;

  }
});

$app->get('/api/web/{id}', function($request, $response, $args){

  $webDAO = new WebDAO();
  $web = $webDAO->selectById($args['id']);

  if (empty($web)){
    $errors['errors'] = "er zijn geen web gevonden";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
    return $response;
  }else{

  $response->getBody()->write(json_encode($web));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;

  }
});

