<?php
/*
require_once WWW_ROOT . 'dao' . DS . 'ImageDAO.php';
require_once WWW_ROOT . 'classes' . DS . 'Token.php';

use PHPassLib\Hash\BCrypt;
use Eventviva\ImageResize;

//401 unauthorized
//403 forbidden

$base = '/api/images';

$app->delete($base.'/{id}', function($request, $response, $args){

  // TODO
  $deleted = $imageDAO->delete($args['id']);

  if(empty($deleted)){
    $response = $response->withStatus(400);
    return $response;
  }

  $response->getBody()->write(json_encode(array()));
  return $response;

});

$app->get($base, function($request, $response, $args){

  // TODO

  $imageDAO = new ImageDAO();

  $data = array();
  $data['images'] = $imageDAO->selectAll();

  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json');

});

$app->get($base.'/{id}', function($request, $response, $args){

  $imageDAO = new ImageDAO();
  $images = $imageDAO->selectByUserId($args['id']);

  $response->getBody()->write(json_encode($images));
  return $response->withHeader('Content-Type','application/json');

});

$app->post($base, function($request, $response, $args){

  $token = new Token();
  $token->setFromRequest($request);

  if(!$token->verify()) {
    $response = $response->withStatus(401);
    return $response;
  }

  $body = $request->getParsedBody();

  $errors = array();

  if(empty($_FILES['file'])) {
    $errors[] = 'Please provide a file to upload';
  }

  if(!empty($errors)) {
    $response->getBody()->write(
      json_encode(array('errors' => $errors))
    );
    $response = $response->withStatus(400);
    return $response;
  }

  $file = $_FILES['file'];

  //er zijn geen errors dus nu op de file checken

  $isImage = getimagesize($file['tmp_name']);

  //return true of false, als false -> geen image

  if(!$isImage) {

    $errors = array();
    $errors[] = 'File must be an image';

    $response->getBody()->write(
      json_encode(array('errors' => $errors))
    );
    $response = $response->withStatus(400);
    return $response;
  }

  //nu weten we zeker dat we een userId en een file hebben

  $imageDAO = new ImageDAO();

  //pathinfo(naam meegeven, extentie uit de naam halen);
  //zit standaard in php
  $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

  $filename = $token->getUser()->id . '_' . uniqid() . '.' . $ext;

  $original = 'uploads' . DS . $filename;
  $thumb = 'uploads' . DS . 'th_' . $filename;
  //hash aanmaken voor je image
  //de hash van md5_file van een foto zal altijd hetzelfde zijn indien deze foto meerdere keren geupload wordt
  $hash = md5_file($file['tmp_name']);

  $existing = $imageDAO->selectByHash($hash);

  if(!empty($existing)) {

    //check of de gebruiker al een keer de image heeft geupload
    if($imageDAO->selectByHashAndUserId($hash, $token->getUser()->id)) {

      $errors = array();
      $errors[] = 'You already uploaded this file!';

      $response->getBody()->write(
        json_encode(array('errors' => $errors))
      );
      $response = $response->withStatus(400);
      return $response;
    }

    //iemand anders heeft de image al geupload
    //pak de originele foto, thumb en hash van de reeds geuploade image
    $original = $existing[0]['original'];
    $thumb = $existing[0]['thumb'];
    $hash = $existing[0]['hash'];

  } else {
    //image bestaat nog niet

    //ImageResize(waar de image nu staat)
    $image = new ImageResize($file['tmp_name']);
    $image->crop(200, 200);
    $image->save(WWW_ROOT . DS . $thumb);

    //originele file niet via ImageResize->save want
    //indien je met een gif werkt, ben je de animatie kwijt
    move_uploaded_file($file['tmp_name'], WWW_ROOT . DS . $original);

  }

  $body['original'] = $original;
  $body['thumb'] = $thumb;
  $body['hash'] = $hash;
  $body['userId'] = $token->getUser()->id;

  $insertedImage = $imageDAO->insert($body);

  if(empty($insertedImage)) {
    $errors = $imageDAO->getValidationErrors($body);
    $response->getBody()->write(json_encode(array('errors' => $errors)));
    $response = $response->withStatus(400);
  } else {
    $response->getBody()->write(json_encode($insertedImage));
    $response = $response->withStatus(201);
  }

  return $response->withHeader('Content-Type', 'application/json');

});*/
