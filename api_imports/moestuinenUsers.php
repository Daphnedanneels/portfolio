<?php

require_once WWW_ROOT . 'dao' . DS . 'MoestuinenUsersDAO.php';


//401 unauthorized
//403 forbidden

$base = '/api/moestuinusers';

$app->post($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $moestuinUsersDAO = new MoestuinenUsersDAO();
  $moestuinenUsers = $request->getParsedBody();

  if(empty($moestuinenUsers['moestuin_id'])){
    $response = $response->withStatus(400);
    return $response;
  }

  $moestuinDAO = new MoestuinDAO();
  $moestuin = $moestuinDAO->selectMoestuinenById($moestuinenUsers["moestuin_id"]);

  if(empty($moestuin)){
    $response = $response->withStatus(400);
    return $response;
  }

  $userDAO = new UserDAO();
  $users = $userDAO->selectAllUsersByMoestuinId($moestuin['id']);

  $check = array();

  foreach($users as $user){
    if($token->hasSameUserId($user['id'])){
    array_push($check, $user['id']);
    }
  }

  if (empty($check)){
    $response = $response->withStatus(403);
    return $response;
  }

  $users = $moestuinenUsers["users"];
  $moestuinId = $moestuinenUsers["moestuin_id"];

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

$app->delete($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $moestuinUsersDAO = new MoestuinenUsersDAO();
  $data = $request->getQueryParams();


  if (empty($data['moestuin_id'])){
    $response = $response->withStatus(400);
    return $response;
  }

  $userDAO = new UserDAO();
  $users = $userDAO->selectAllUsersByMoestuinId($data['moestuin_id']);

  $check = array();

  foreach($users as $user){
    if($token->hasSameUserId($user['id'])){
    array_push($check, $user['id']);
    }
  }

  if (empty($check)){
    $response = $response->withStatus(403);
    return $response;
  }

  $moestuinUsersDAO->deleteMoestuinUser($data);
  $response->getBody()->write(json_encode(true));
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


