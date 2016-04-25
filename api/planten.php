<?php

require WWW_ROOT.'dao'.DS.'PlantenDAO.php';

$app->get('/api/planten', function($request, $response, $args){

  $plantenDAO = new PlantenDAO();
  $planten = $plantenDAO->selectAll();

  $response->getBody()->write(json_encode($planten));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;
});

