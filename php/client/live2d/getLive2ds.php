<?php
include "../common/index.php";

class Word{
  public $id;
  public $content;
  public $time;
  public $username;
}

$from = $_GET["from"];

$sql = "SELECT * FROM LIVE2D order by id DESC limit $from,10";
$result = $conn->query($sql);
if($result->num_rows > 0){
  $returnResult = new Success();
  while($row = $result->fetch_assoc()){
    $data = new Word();
    $data->id = $row["id"];
    $data->time = $row["time"];
    $data->content = $row["content"];
    $data->username = $row["author"];
    $returnResult->data[] = $data;
  }
}else{
  $returnResult = new Success();
  $returnResult->data = array();
}
echo json_encode($returnResult);

?>