<?php
  include "../common/index.php";

  class Artical{
    public $id;
    public $title;
    public $summary;
    public $coverimg;
    public $kind;
    public $articalid;
    public $time;
  }

  class Life{
    public $id;
    public $content;
    public $articalid;
    public $time;
  }
  
  $returnResult = new Success();
  $sql = "SELECT id,title,summary,coverimg,articalid,sendtime FROM JOURNAL order by id DESC";
  $sql1 = "SELECT * FROM RECORD order by id DESC";
  $result = $conn->query($sql);
  $result1 = $conn->query($sql1);
  if ($result->num_rows > 0) {
      // 输出数据
      while($row = $result->fetch_assoc()) {
          $data = new Artical();
          $data->id = $row["id"];
          $data->title = $row["title"];
          $data->summary = $row["summary"];
          $data->coverimg = $row["coverimg"];
          $data->kind = $row["kind"];
          $data->articalid = $row["articalid"];
          $data->time = $row["sendtime"];
          $returnResult->data->artical[] = $data;
      }
  }else{
    $returnResult->data->artical[] = array();
  }
  if ($result1->num_rows > 0) {
      // 输出数据
      while($row1 = $result1->fetch_assoc()) {
          $data = new Life();
          $data->id = $row1["id"];
          $data->content = htmlspecialchars_decode($row1["content"]);
          $data->articalid = $row1["articalid"];
          $data->time = $row1["sendtime"];
          $returnResult->data->life[] = $data;
      }
  }else{
    $returnResult->data->life[] = array();
  }
  echo json_encode($returnResult);
?>