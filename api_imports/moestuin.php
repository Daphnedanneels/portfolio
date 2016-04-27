<?php

require WWW_ROOT.'dao'.DS.'PercelenDAO.php';
require WWW_ROOT.'dao'.DS.'MoestuinDAO.php';
require WWW_ROOT.'dao'.DS.'MoestuinenUsersDAO.php';

$app->get('/api/moestuinen', function($request, $response, $args){
  $moestuinDAO = new MoestuinDAO();

  //hier haal je de parameter ?user_id=20 op
  $params = $request->getQueryParams();

  if (!empty($params['user_id'])){
    $moestuinen = $moestuinDAO->selectMoestuinenByUser($params['user_id']);
  }else{
    $moestuinen = $moestuinDAO->selectAll();
  }

  $response = $response->write(json_encode($moestuinen));
  $response = $response->withStatus(200);

  $response = $response->withHeader('Content-Type','application/json');
  return $response;
});


$app->get('/api/moestuinen/{id}', function($request, $response, $args){

  $moestuinDAO = new MoestuinDAO();
  $moestuin = $moestuinDAO->selectMoestuinenById($args['id']);

  $response->getBody()->write(json_encode($moestuin));
  return $response->withHeader('Content-Type','application/json');
});



$app->post('/api/moestuinen', function($request, $response, $args){

  $moestuinDAO = new MoestuinDAO();
  $moestuinen = $request->getParsedBody();

  // var_dump($moestuinen);
  $insertedMoestuin = $moestuinDAO->insertMoestuin($moestuinen);

  if(empty($insertedMoestuin)) {
    $errors = array();
    $errors['errors'] = $moestuinDAO->getValidationErrors($moestuinen);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedMoestuin));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');

});
