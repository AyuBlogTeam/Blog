<?php
include "../common/index.php";

$content = $_GET['content'];
$ip = $_GET['ip'];
$username = $_GET['username'];
if(empty($content)){
  $returnResult = new Fail();
  $returnResult->data = "新增失败";
  echo json_encode($returnResult);
  return;
}
$sql = "INSERT INTO LIVE2D (content,ip,author) VALUES ('$content','$ip','$username')";
$result = $conn->query($sql);
if($result){
    $returnResult = new Success();
    $returnResult->data = "新增成功";
}else{
    $returnResult = new Fail();
    $returnResult->data = "新增失败";
}
echo json_encode($returnResult);
?>