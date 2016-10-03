<?php

require WWW_ROOT.'dao'.DS.'GraphicDAO.php';

$app->get('/api/graphic', function($request, $response, $args){

  $graphicDAO = new GraphicDAO();

  $params = $request->getQueryParams();

  if($params['count']){
    $graphic = $graphicDAO->countProjects();
  } else {
    $graphic = $graphicDAO->selectAll();
  }

  if (empty($graphic)){
    $errors['errors'] = "er zijn geen graphic gevonden";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
    return $response;
  }else{

  $response->getBody()->write(json_encode($graphic));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;

  }
});

$app->get('/api/graphic/{id}', function($request, $response, $args){

  $graphicDAO = new GraphicDAO();
  $graphic = $graphicDAO->selectById($args['id']);

  if (empty($graphic)){
    $errors['errors'] = "er zijn geen graphic gevonden";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
    return $response;
  }else{

  $response->getBody()->write(json_encode($graphic));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;

  }
});
