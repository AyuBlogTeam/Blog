<?php
include "../common/index.php";

$post = json_decode(file_get_contents('php://input'),true);
$ip = $post['ip'];
$content = $post['content'];

$sql = "INSERT INTO FEEDBACK (ip,content) VALUES ('$ip','$content')";

$result = $conn->query($sql);
if($result){
  $returnResult = new Success();
  $returnResult->data = "反馈成功";
}else{
  $returnResult = new Fail();
  $returnResult->data = "反馈失败";
}

echo json_encode($returnResult);

?>