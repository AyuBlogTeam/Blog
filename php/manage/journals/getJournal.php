<?php
  include "../common/index.php";

  class Artical{
      public $id;
      public $title;
      public $summary;
      public $coverimg;
      public $articalid;
      public $time;
  }

  $sql = "SELECT id,title,summary,coverimg,articalid,sendtime FROM JOURNAL order by id DESC";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // 输出数据
      $returnResult = new Success();
      while($row = $result->fetch_assoc()) {
          $data = new Artical();
          $data->id = $row["id"];
          $data->title = $row["title"];
          $data->summary = $row["summary"];
          $data->coverimg = $row["coverimg"];
          $data->articalid = $row["articalid"];
          $data->time = $row["sendtime"];
          $returnResult->data[] = $data;
      }
  }else{
      $returnResult = new Success();
      $returnResult->data = array();
  }
  echo json_encode($returnResult);
?>