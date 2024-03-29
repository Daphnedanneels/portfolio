<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class UserDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT *
            FROM `mst_users`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectAllMin(){
     $sql = "SELECT voornaam, achternaam, foto, id FROM `mst_users`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function searchUsers($search){
    $sql = "SELECT `voornaam`, `achternaam`, `foto`, `id` FROM `mst_users`
            WHERE `voornaam` LIKE :voornaam OR `achternaam` LIKE :achternaam
            ORDER BY `voornaam` ASC";

    $stmt = $this->pdo->prepare($sql);

    $stmt->bindValue(":voornaam", '%' . $search. '%');
    $stmt->bindValue(":achternaam", '%' . $search. '%');

    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `mst_users`
            WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectByEmail($email) {
    $sql = "SELECT *
            FROM `mst_users`
            WHERE `email` = :email";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':email', $email);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectAllUsersByMoestuinId($moestuin_id){
    $sql = "SELECT * FROM mst_moestuinen_users RIGHT JOIN mst_moestuinen on mst_moestuinen_users.moestuin_id = mst_moestuinen.id INNER JOIN mst_users on mst_moestuinen.eigenaar = mst_users.id OR mst_moestuinen_users.user_id = mst_users.id where mst_moestuinen.id = :moestuin_id GROUP BY mst_users.id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':moestuin_id', $moestuin_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `mst_users` (`voornaam`,`achternaam`,`email`, `wachtwoord`, `foto`, `hash`)
              VALUES (:voornaam, :achternaam, :email, :wachtwoord, :foto, :hash)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':email', $data['email']);
      $stmt->bindValue(':wachtwoord', $data['wachtwoord']);
      $stmt->bindValue(':voornaam', $data['voornaam']);
      $stmt->bindValue(':achternaam', $data['achternaam']);
      $stmt->bindValue(':foto', $data['foto']);
      $stmt->bindValue(':hash', $data['hash']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function selectByHash($hash) {
    $sql = "SELECT *
            FROM `mst_moestuinen`
            WHERE `hash` = :hash";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':hash', $hash);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }




  public function getValidationErrors($data) {
    $errors = array();
    if(empty($data['email'])) {
      $errors['email'] = 'Je bent je email vergeten';
    }
    if(empty($data['wachtwoord'])) {
      $errors['wachtwoord'] = 'Je bent je wachtwoord vergeten';
    }
    if(empty($_FILES['foto'])) {
      $errors['file'] = 'Je hebt je foto vergeten';
    }
    if(empty($data['voornaam'])) {
      $errors['voornaam'] = 'Je bent je voornaam vergeten';
    }
     if(empty($data['achternaam'])) {
      $errors['achternaam'] = 'Je bent je achternaam vergeten';
    }
    return $errors;
  }
}

