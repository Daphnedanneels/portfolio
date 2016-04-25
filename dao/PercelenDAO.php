<?php
require_once WWW_ROOT . 'dao' . DS . 'DAO.php';
class PercelenDAO extends DAO {

  public function selectPercelenById($id){
    $sql = "SELECT * FROM `mst_percelen` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectPercelenByIdWithPlant($id){
    $sql = "SELECT *, mst_percelen.id AS percelen_id FROM `mst_percelen` INNER JOIN mst_planten on mst_percelen.plant_id = mst_planten.id WHERE mst_percelen.id = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectPercelenByMoestuinId($moestuin_id){
    $sql = "SELECT *, mst_percelen.id AS percelen_id FROM mst_percelen LEFT JOIN mst_planten on mst_percelen.plant_id = mst_planten.id WHERE mst_percelen.moestuin_id = :moestuin_id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':moestuin_id', $moestuin_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }


  public function updatePlantBijPerceel($data){
     $errors = $this->getValidationErrors($data);
      if(empty($errors)) {
        $sql = "UPDATE `mst_percelen` SET `plant_id`= :plant_id , `status`= :status WHERE id = :perceel_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':plant_id', $data['plant_id']);
        $stmt->bindValue(':perceel_id', $data['perceel_id']);
        $stmt->bindValue(':status', 1);
        if ($stmt->execute()){
          return $this->selectPercelenByIdWithPlant($data['perceel_id']);
        }
      }
      return false;
  }

  public function insertPercelen($data){
      $sql = "INSERT INTO `mst_percelen` (`moestuin_id`, `nummer`, `status`) VALUES (:moestuin_id, :nummer, :status )";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':moestuin_id', $data['moestuin_id']);
      $stmt->bindValue(':nummer', $data['nummer']);
      $stmt->bindValue(':status', $data['status']);
      if($stmt->execute()){
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectPercelenById($insertedId);
      }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['plant_id'])) {
      $errors['plant_id'] = 'Je hebt geen plant_id';
    }
    if(empty($data['perceel_id'])) {
      $errors['perceel_id'] = 'Je bent je perceel id vergeten';
    }
    return $errors;
  }
}

