<?php
include "../common/index.php";

$articalId = $_GET["articalId"];

$sql = "DELETE FROM ARTICAL WHERE articalId='$articalId'";
$result = $conn->query($sql);
if($result){
    $returnResult = new Success();
    $returnResult->data = "删除成功";
}else{
    $returnResult = new Fail();
    $returnResult->data = "删除失败";
}
echo json_encode($returnResult);
?>