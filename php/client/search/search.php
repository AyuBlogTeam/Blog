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
  public $label="artical";
}

class Journal{
  public $id;
  public $title;
  public $summary;
  public $coverimg;
  public $articalid;
  public $time;
  public $label="journal";
}

class Record{
  public $id;
  public $content;
  public $articalid;
  public $time;
  public $label="record";
}
$post = json_decode(file_get_contents('php://input'),true);
$search = $post['search'];

$sql = "SELECT id,title,summary,coverimg,kind,articalid,sendtime FROM ARTICAL where title like '%$search%' or content like '%$search%';";
$sql .= "SELECT * FROM RECORD where content like '%$search%';";
$sql .= "SELECT id,title,summary,coverimg,articalid,sendtime FROM JOURNAL where title like '%$search%' or content like '%$search%'";

$num = 0;
if ($conn->multi_query($sql)){
  $returnResult = new Success();
  do{
    if ($rs = $conn->store_result()){
      while ($row=$rs->fetch_array()){
        if($num === 0){
          $artical = new Artical();
          $artical->id = $row["id"];
          $artical->title = $row["title"];
          $artical->summary = $row["summary"];
          $artical->coverimg = $row["coverimg"];
          $artical->kind = $row["kind"];
          $artical->articalid = $row["articalid"];
          $artical->time = $row["sendtime"];
          $returnResult->data[] = $artical;
        }
        if($num === 1){
          $life = new Record();
          $life->id = $row["id"];
          $life->content = htmlspecialchars_decode($row["content"]);
          $life->articalid = $row["articalid"];
          $life->time = $row["sendtime"];
          $returnResult->data[] = $life;
        }
        if($num === 2){
          $journal = new Journal();
          $journal->id = $row["id"];
          $journal->title = $row["title"];
          $journal->summary = $row["summary"];
          $journal->coverimg = $row["coverimg"];
          $journal->articalid = $row["articalid"];
          $journal->time = $row["sendtime"];
          $returnResult->data[] = $journal;
        }
      }
      $rs->Close(); 
      if ($conn->more_results()){
        $num+=1;
      }
    }
  }while($conn->next_result());
}else{
  $returnResult = new File();
  $returnResult->data = "操作失败";
}
echo json_encode($returnResult);
?>