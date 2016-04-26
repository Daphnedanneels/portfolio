<?php

require_once WWW_ROOT . 'dao' . DS . 'MoestuinenUsersDAO.php';


//401 unauthorized
//403 forbidden

$base = '/api/moestuinusers';

$app->post($base, function($request, $response, $args){

  $moestuinUsersDAO = new MoestuinenUsersDAO();
  $moestuinenUsers = $request->getParsedBody();

  // var_dump("moestuinusers",$moestuinenUsers);

  $users = $moestuinenUsers["users"];
  $moestuinId = $moestuinenUsers["moestuin_id"];

  // var_dump("users:", $users);
  // var_dump("moestuinid:", $moestuinId);

  foreach ($users as $user => $id) {
    $moestuinenUsers = array(
      "moestuin_id" => $moestuinId,
      "user_id" => $id
    );

    $insertedMoestuinUser = $moestuinUsersDAO->insertMoestuinUser($moestuinenUsers);
  }

  if(empty($insertedMoestuinUser)) {
    $errors = array();
    $errors['errors'] = 'Er is iets misgelopen';
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedMoestuinUser));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');

});

/*
$app->get(`${base}/{id}`, function($request, $response, $args){

  $moestuinenUsersDAO = new MoestuinenUsersDAO();
  $moestuinUsers = $moestuinenUsersDAO->selectMoestuinenById($args['id']);


  $moestuin['percelen'] = $percelen;

  $response->getBody()->write(json_encode($moestuin));
  return $response->withHeader('Content-Type','application/json');

}*/


