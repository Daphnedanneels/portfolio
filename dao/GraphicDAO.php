<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class GraphicDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT *
            FROM `graphic`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function countProjects() {
    $sql = "SELECT COUNT(*) AS amount
            FROM `graphic`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *
            FROM `graphic`
            WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

}

