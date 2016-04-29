<?php

require WWW_ROOT.'dao'.DS.'PercelenDAO.php';
require WWW_ROOT.'dao'.DS.'MoestuinDAO.php';
require WWW_ROOT.'dao'.DS.'MoestuinenUsersDAO.php';
// require WWW_ROOT.'vendor'.DS.'eventviva'.DS.'php-image-resize'.DS.'src.php';

use PHPassLib\Hash\BCrypt;
use Eventviva\ImageResize;

$app->get('/api/moestuinen', function($request, $response, $args){

  $moestuinDAO = new MoestuinDAO();
  $params = $request->getQueryParams();

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  if(!empty($params['user_id'])){
    if(!$token->hasSameUserId($params['user_id'])){
      $response = $response->withStatus(403);
      return $response;
    }
    $moestuinen = $moestuinDAO->selectMoestuinenByUser($params['user_id']);
  }else{
    $response = $response->withStatus(401);
    return $response;
  }

  $response = $response->write(json_encode($moestuinen));
  $response = $response->withStatus(200);

  $response = $response->withHeader('Content-Type','application/json');
  return $response;
});


$app->get('/api/moestuinen/{id}', function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $moestuinDAO = new MoestuinDAO();
  $moestuin = $moestuinDAO->selectMoestuinenById($args['id']);

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

  $response->getBody()->write(json_encode($moestuin));
  return $response->withHeader('Content-Type','application/json');
});


$app->post('/api/moestuinen', function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()){
    $response = $response->withStatus(401);
    return $response;
  }

  $moestuinDAO = new MoestuinDAO();
  $moestuinen = $request->getParsedBody();

  if(empty($moestuinen['eigenaar'])){
    $response = $response->withStatus(400);
    return $response;
  }

  if(!$token->hasSameUserId($moestuinen['eigenaar'])){
    $response = $response->withStatus(403);
    return $response;
  }

  $errors = array();
  $errors['errors'] = $moestuinDAO->getValidationErrors($moestuinen);

  if(!empty($errors['errors'])){
    $response->getBody()->write(
      json_encode(array('errors' => $errors))
    );
    $response = $response->withStatus(400);
    return $response;
  }

   $file = $_FILES['foto'];

   $isImage = getimagesize($file['tmp_name']);

   if(!$isImage) {
    $errors = array();
    $errors['errors'] = 'File must be an image';

    $response->getBody()->write(
      json_encode(array('errors' => $errors))
    );
    $response = $response->withStatus(400);
    return $response;
   }

  $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
  $filename = $token->getUser()->id . '_' . uniqid() . '.' . $ext;
  $foto = 'uploads' . DS . 'th_' . $filename;
  $hash = md5_file($file['tmp_name']);

  $existing = $moestuinDAO->selectByHash($hash);

  if(!empty($existing)) {

    if($moestuinDAO->selectByHashAndUserId($hash, $moestuinen['eigenaar'])){

      $errors = array();
      $errors[] = 'You already uploaded this file!';

      $response->getBody()->write(
        json_encode(array('errors' => $errors))
      );
      $response = $response->withStatus(400);
      return $response;
    }

    $foto = $existing[0]['foto'];
    $hash = $existing[0]['hash'];

  } else {
    //image bestaat nog niet

    //ImageResize(waar de image nu staat)
    $image = new ImageResize($file['tmp_name']);
    $image->crop(250, 150);
    $image->save(WWW_ROOT . DS . $foto);

    //originele file niet via ImageResize->save want
    //indien je met een gif werkt, ben je de animatie kwijt
  }

  $moestuinen['foto'] = $foto;
  $moestuinen['hash'] = $hash;

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
