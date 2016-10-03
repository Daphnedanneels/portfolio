<?php

require WWW_ROOT.'dao'.DS.'MotionDAO.php';

$app->get('/api/motion', function($request, $response, $args){

  $motionDAO = new MotionDAO();

  $params = $request->getQueryParams();

  if($params['count']){
    $motion = $motionDAO->countProjects();
  } else {
    $motion = $motionDAO->selectAll();
  }

  if (empty($motion)){
    $errors['errors'] = "er zijn geen motion gevonden";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
    return $response;
  }else{

  $response->getBody()->write(json_encode($motion));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;

  }
});

$app->get('/api/motion/{id}', function($request, $response, $args){

  $motionDAO = new MotionDAO();
  $motion = $motionDAO->selectById($args['id']);

  if (empty($motion)){
    $errors['errors'] = "er zijn geen motion gevonden";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
    return $response;
  }else{

  $response->getBody()->write(json_encode($motion));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;

  }
});
