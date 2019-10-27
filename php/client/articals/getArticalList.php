<?php
  include "../common/index.php";

  class ArticalList{
      public $title;
      public $articalid;
  }

  $sql = "SELECT title,articalid FROM ARTICAL order by id desc limit 0,10";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // 输出数据
      $returnResult = new Success();
      while($row = $result->fetch_assoc()) {
          $data = new ArticalList();
          $data->title = $row["title"];
          $data->articalid = $row["articalid"];
          $returnResult->data[] = $data;
      }
  }else{
      $returnResult = new Success();
      $returnResult->data = array();
  }
  echo json_encode($returnResult);
?>