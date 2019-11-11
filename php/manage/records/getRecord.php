<?php
  include "../common/index.php";

  class Artical{
      public $id;
      public $content;
      public $articalid;
      public $time;
      public $ismusic;
  }

  $sql = "SELECT id,content,articalid,sendtime,isMusic FROM RECORD order by id DESC";

  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // 输出数据
      $returnResult = new Success();
      while($row = $result->fetch_assoc()) {
          $data = new Artical();
          $data->id = $row["id"];
          $data->content = htmlspecialchars_decode($row["content"]);
          $data->articalid = $row["articalid"];
          $data->time = $row["sendtime"];
          $data->ismusic = $row["isMusic"]=="1"?true:false;
          $returnResult->data[] = $data;
      }
  }else{
      $returnResult = new Success();
      $returnResult->data = array();
  }
  echo json_encode($returnResult);
?>