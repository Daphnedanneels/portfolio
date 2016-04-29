<?php

require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'classes' . DS . 'Token.php';

use PHPassLib\Hash\BCrypt;

$app->post('/api/auth', function($request, $response, $args){

  $userDAO = new UserDAO();
  $body = $request->getParsedBody();
  $errors = array();

  if(!empty($body)){
    if(!empty($body['email']) && !empty($body['wachtwoord'])){

      $user = $userDAO->selectByEmail($body['email']);

      if(!empty($user)){

        $verified = BCrypt::verify(
          $body['wachtwoord'],
          $user['wachtwoord']
        );

        if($verified){

          unset($user['password']);

          $token = new Token();

          $t = $token->create(3600, $body['clientId'], $user, 'http://localhost');

          $data = array('token' => $t);
          $response->getBody()->write(json_encode($data));

          return $response->withHeader('Content-Type','application/json');
        }
      }
    }
  }

  $data = array('error' => 'het email adres of wachtwoord klopt niet');
  $response->getBody()->write(json_encode($data));
  return $response->withHeader('Content-Type','application/json')->withStatus(400);

});
