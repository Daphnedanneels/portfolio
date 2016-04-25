<?php

require_once WWW_ROOT . 'dao' . DS . 'PercelenDAO.php';

//401 unauthorized
//403 forbidden

$base = '/api/percelen';

$app->post($base, function($request, $response, $args){

  $PercelenDAO = new PercelenDAO();
  $data = $request->getParsedBody();

  // var_dump($data);

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

  $PercelenDAO = new PercelenDAO();
  $data = $request->getParsedBody();


  if ($data['action'] === "insert"){
    $updatedPerceel = $PercelenDAO->insertPlantBijPerceel($data);
  }

  if($data['action'] === "delete"){
    $updatedPerceel = $PercelenDAO->verwijderPlantBijPerceel($data);
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
