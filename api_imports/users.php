<?php

require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';

use PHPassLib\Hash\BCrypt;

//401 unauthorized
//403 forbidden

$base = '/api/users';

$app->get($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  $userDAO = new UserDAO();

  $data = array();
  $params = $request->getQueryParams();

  if(!empty($params['moestuin_id'])){
    $data = $userDAO->selectAllUsersByMoestuinId($params['moestuin_id']);
  }

  if(!empty($params['q'])){
    $data = $userDAO->searchUsers($params['q']);
  }

  if(empty($params['q']) && empty($params['moestuin_id'])){
    $data = $userDAO->selectAllMin();
  }

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');
});

$app->post($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  $userDAO = new UserDAO();
  $user = $request->getParsedBody();

  $email = $userDAO->selectByEmail($user['email']);

  if (!empty($email)){
    $errors['error'][0] = "Dit email is al in gebruik";
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  }else{
    if($user['wachtwoord']){
      $user['wachtwoord'] = BCrypt::hash($user['wachtwoord']);
    }
    $insertedUser = $userDAO->insert($user);

    if(empty($insertedUser)) {
      $errors = array();
      $errors['errors'] = $userDAO->getValidationErrors($user);
      $response->getBody()->write(json_encode($errors));
      $response = $response->withStatus(400);
    } else {
      $response->getBody()->write(json_encode($insertedUser));
      $response = $response->withStatus(201);
    }
  }
   return $response->withHeader('Content-Type','application/json');
});
