<?php
require_once WWW_ROOT . 'dao' . DS . 'DAO.php';
class MoestuinenUsersDAO extends DAO {

  public function selectMoestuinenById($moestuin_id){
    $sql = "SELECT * FROM `mst_moestuinen_users` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $moestuin_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectAllUsersByMoestuinId($moestuin_id){
    $sql = "SELECT * FROM mst_moestuinen_users INNER JOIN mst_users on
            mst_moestuinen_users.user_id = mst_users.id WHERE mst_moestuinen_users.moestuin_id = :moestuin_id ";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':moestuin_id', $moestuin_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }


  public function insertMoestuinUser($data){
      $sql = "INSERT INTO `mst_moestuinen_users` (`moestuin_id`, `user_id`) VALUES (:moestuin_id, :user_id)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':moestuin_id', $data['moestuin_id']);
      $stmt->bindValue(':user_id', $data['user_id']);
      if($stmt->execute()){
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectMoestuinenById($insertedId);
      }
    return false;
  }
}
