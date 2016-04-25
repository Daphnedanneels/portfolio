<?php

require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class PlantenDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT *
            FROM `mst_planten`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

}

