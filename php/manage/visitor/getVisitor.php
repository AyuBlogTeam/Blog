<?php
  include "../common/index.php";

  $from=$_GET["from"];
  
  class Visitor{
      public $key;
      public $cip;
      public $cid;
      public $cname;
      public $time;
  }

  $sql = "SELECT * FROM VISITORIP order by id DESC limit $from,10";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // 输出数据
      $returnResult = new Success();
      while($row = $result->fetch_assoc()) {
          $data = new Visitor();
          $data->key = $row["id"];
          $data->cip = $row["cip"];
          $data->cid = $row["cid"];
          $data->cname = $row["cname"];
          $data->time = $row["time"];
          $returnResult->data->data[] = $data;
      }
      $sql1 = "SELECT COUNT(*) AS count FROM VISITORIP";
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