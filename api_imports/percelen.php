<?php

require_once WWW_ROOT . 'dao' . DS . 'PercelenDAO.php';

//401 unauthorized
//403 forbidden

$base = '/api/percelen';

$app->get('/api/percelen', function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $percelenDAO = new PercelenDAO();
  $params = $request->getQueryParams();

  if (empty($params)){
    $response = $response->withStatus(401);
    return $response;
  }

  $moestuinDAO = new MoestuinDAO();
  $moestuin = $moestuinDAO->selectMoestuinenById($params["moestuin_id"]);

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

  if (empty($moestuin)){
    $response = $response->withStatus(400);
    return $response;
  }

  $percelen = $percelenDAO->selectPercelenByMoestuinId($params['moestuin_id']);
  $response->getBody()->write(json_encode($percelen));
  $response = $response->withHeader('Content-Type','application/json');
  return $response;
});


$app->post($base, function($request, $response, $args){


  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $PercelenDAO = new PercelenDAO();
  $data = $request->getParsedBody();

  if(empty($data['moestuin_id'])){
    $response = $response->withStatus(400);
    return $response;
  }


  $moestuinDAO = new MoestuinDAO();
  $moestuin = $moestuinDAO->selectMoestuinenById($data["moestuin_id"]);

  if (empty($moestuin)){
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


  $rijen = $data['rijen'];
  $kolommen = $data['kolommen'];
  $totaal = $rijen * $kolommen;

  $percelen = [];

  for ($i=0; $i < $totaal; $i++){
    $perceelData = array(
      "moestuin_id"=>$data['moestuin_id'],
      "nummer"=>$i,
      "status"=>0
    );
    $insertedPercelen = $PercelenDAO->insertPercelen($perceelData);

    array_push($percelen,$insertedPercelen);
  }

  $response->getBody()->write(json_encode($percelen));
  $response = $response->withStatus(201);
  return $response->withHeader('Content-Type','application/json');
});


$app->put($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $PercelenDAO = new PercelenDAO();
  $data = $request->getParsedBody();

  if(empty($data)){
    $response = $response->withStatus(400);
    return $response;
  }

  if ($data['action'] === "insert"){
    $updatedPerceel = $PercelenDAO->insertPlantBijPerceel($data);
  }

  if($data['action'] === "delete"){
    $updatedPerceel = $PercelenDAO->verwijderPlantBijPerceel($data);
  }

  if($data['action'] === "water"){
    $updatedPerceel = $PercelenDAO-> updateWater($data);
  }

  if(empty($updatedPerceel)){
    $errors['errors'] = $PercelenDAO->getValidationErrors($data);
    $response->getBody()->write(json_encode($errors));
    $response = $response->withStatus(400);
  }else{
    $response->getBody()->write(json_encode($updatedPerceel));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type','application/json');
});
