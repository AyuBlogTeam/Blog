<?php
  include "../common/index.php";

  class Visitor{
      public $key;
      public $cip;
      public $cid;
      public $cname;
      public $time;
  }

  $sql = "SELECT * FROM VISITORIP order by id DESC";

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
          $returnResult->data[] = $data;
      }
  }else{
      $returnResult = new Success();
      $returnResult->data = array();
  }
  echo json_encode($returnResult);
?>