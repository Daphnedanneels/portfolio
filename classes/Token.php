<?php

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class Token {

  private $token;
  private $secret = '81O9176983hbljhjuhoudhiueh';

  public function setFromRequest($request) {
    $string = $request->getHeader('x-auth-token');

    if(empty($string)) {
      $this->token = false;
    } else {
      $this->token = (new Parser())->parse((string) $string[0]);
    }
  }

  public function verify() {

    //geen token dus ongeldig
    if(!$this->token) {
      return false;
    }

    //token is niet gesigneerd zoals de token op de server
    $signer = new Sha256();
    if(!$this->token->verify($signer, $this->secret)) {
      return false;
    }

    //wanneer tot wanneer is de token geldig
    //indien na de verstreken datum, wordt die false
    $data = new ValidationData();
    if(!$this->token->validate($data)) {
      return false;
    }

    return true;
  }

  public function isAdmin() {
    //getclaim gaat data uit de token halen
    $role = intval($this->token->getClaim('user')->role);
    return $role == 1;
  }

  public function hasSameUserId($userId) {
    $id = intval($this->token->getClaim('user')->id);
    //returned true als onderstaand juist is
    return $id == intval($userId);
  }

  public function create($expiration, $clientId, $user, $issuer) {

    $signer = new Sha256();
    $builder = new Builder();

    $this->token = $builder
      ->setIssuedAt(time())
      ->setExpiration(time() + $expiration)
      ->setAudience($clientId)
      ->setSubject($user['id'])
      ->setIssuer($issuer)
      ->set('user', $user)
      ->sign($signer, $this->secret)
      ->getToken();

    return (string) $this->token;

  }

}
