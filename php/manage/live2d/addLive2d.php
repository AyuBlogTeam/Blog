<?php
include "../common/index.php";

$content = $_GET['content'];

$sql = "INSERT INTO LIVE2D (content) VALUES ('$content')";

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