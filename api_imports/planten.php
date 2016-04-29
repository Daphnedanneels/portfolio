<?php

require WWW_ROOT.'dao'.DS.'PlantenDAO.php';

$app->get('/api/planten', function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $plantenDAO = new PlantenDAO();
  $planten = $plantenDAO->selectAll();

  if (empty($planten)){
    $errors['errors'] = "er zijn geen planten gevonden";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
    return $response;
  }else{

  $response->getBody()->write(json_encode($planten));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;

  }
});

