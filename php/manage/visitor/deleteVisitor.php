<?php
include "../common/index.php";

$id = $_GET["id"];

$sql = "DELETE FROM VISITORIP WHERE id='$id'";
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