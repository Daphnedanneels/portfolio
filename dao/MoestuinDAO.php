<?php
require_once WWW_ROOT . 'dao' . DS . 'DAO.php';
class MoestuinDAO extends DAO {

  public function selectMoestuinenByUser($user_id){
    // $sql = "SELECT * FROM `mst_moestuinen` WHERE `eigenaar` = :eigenaar";
    $sql ="SELECT *,mst_moestuinen.id as moestuinen_id FROM mst_moestuinen LEFT JOIN mst_moestuinen_users on mst_moestuinen.id = mst_moestuinen_users.moestuin_id WHERE mst_moestuinen_users.user_id = :eigenaar2 OR mst_moestuinen.eigenaar = :eigenaar GROUP BY mst_moestuinen.id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':eigenaar', $user_id);
    $stmt->bindValue(':eigenaar2', $user_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectMoestuinenById($moestuin_id){
    $sql = "SELECT * FROM `mst_moestuinen` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $moestuin_id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectAll() {
    $sql = "SELECT * FROM `mst_moestuinen`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insertMoestuin($data){
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `mst_moestuinen` (`naam`, `rijen`, `kolommen`, `eigenaar`, `foto`, `hash`) VALUES (:naam, :rijen, :kolommen, :eigenaar, :foto, :hash)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':naam', $data['naam']);
      $stmt->bindValue(':rijen', $data['rijen']);
      $stmt->bindValue(':kolommen', $data['kolommen']);
      $stmt->bindValue(':eigenaar', $data['eigenaar']);
      $stmt->bindValue(':foto', $data['foto']);
      $stmt->bindValue(':hash', $data['hash']);
      if($stmt->execute()){
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectMoestuinenById($insertedId);
      }
    }
    return false;
  }
  /*
  public function selectById($id) {
    $sql = "SELECT * FROM `comebacks` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `comebacks` (`oneliner_id`, `created`, `text`, `author`) VALUES (:oneliner_id, :created, :text, :author)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':oneliner_id', $data['oneliner_id']);
      $stmt->bindValue(':created', $data['created']);
      $stmt->bindValue(':text', $data['text']);
      $stmt->bindValue(':author', $data['author']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function update($id, $data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `comebacks` SET `oneliner_id` = :oneliner_id, `created` = :created, `text` = :text, `author` = :author WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':oneliner_id', $data['oneliner_id']);
      $stmt->bindValue(':created', $data['created']);
      $stmt->bindValue(':text', $data['text']);
      $stmt->bindValue(':author', $data['author']);
      $stmt->bindValue(':id', $id);
      if($stmt->execute()) {
        return $this->selectById($id);
      }
    }
    return false;
  }

  public function delete($id) {
    $sql = "DELETE FROM `comebacks` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function deleteByOnelinerId($oneliner_id) {
    $sql = "DELETE FROM `comebacks` WHERE `oneliner_id` = :oneliner_id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':oneliner_id', $oneliner_id);
    return $stmt->execute();
  }
  */

  public function selectByHash($hash) {
    $sql = "SELECT *
            FROM `mst_moestuinen`
            WHERE `hash` = :hash";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':hash', $hash);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectByHashAndUserId($hash, $userId) {
    $sql = "SELECT *
            FROM `mst_moestuinen`
            WHERE `hash` = :hash
            AND `eigenaar` = :user_id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':hash', $hash);
    $stmt->bindValue(':user_id', $userId);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }


  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['naam'])) {
      $errors['naam'] = 'Je bent je naam vergeten';
    }

    if(empty($_FILES['foto'])) {
      $errors['file'] = 'Je hebt je foto vergeten';
    }
    if(empty($data['rijen'])) {
      $errors['rijen'] = 'Je bent je rijen vergeten';
    }
    if(empty($data['kolommen'])) {
      $errors['kolommen'] = 'Je bent je kolommen vergeten';
    }

    return $errors;
  }
}
