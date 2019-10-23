<?php
include "../common/index.php";

class Word{
  public $id;
  public $content;
}

$sql = "SELECT * FROM WORD order by RAND() LIMIT 30";
$result = $conn->query($sql);
if($result->num_rows > 0){
  $returnResult = new Success();
  while($row = $result->fetch_assoc()){
    $data = new Word();
    $data->id = $row["id"];
    $data->content = $row["content"];
    $returnResult->data[] = $data;
  }
}else{
  $returnResult = new Success();
  $returnResult->data = array();
}
echo json_encode($returnResult);

?>