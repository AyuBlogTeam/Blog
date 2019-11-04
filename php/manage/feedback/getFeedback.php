<?php
  include "../common/index.php";

  $from=$_GET["from"];
  
  class Visitor{
      public $key;
      public $time;
      public $content;
      public $ip;
  }

  $sql = "SELECT * FROM FEEDBACK order by id DESC limit $from,10";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // 输出数据
      $returnResult = new Success();
      while($row = $result->fetch_assoc()) {
          $data = new Visitor();
          $data->key = $row["id"];
          $data->content = $row["content"];
          $data->time = $row["time"];
          $data->ip = $row["ip"];
          $returnResult->data->data[] = $data;
      }
      $sql1 = "SELECT COUNT(*) AS count FROM FEEDBACK";
      $result1 = $conn->query($sql1);
      if ($result1->num_rows > 0) {
        while($row1 = $result1->fetch_assoc()) {
            $returnResult->data->total = $row1["count"];
        }
      }
  }else{
      $returnResult = new Success();
      $returnResult->data = array();
  }
  echo json_encode($returnResult);
?>