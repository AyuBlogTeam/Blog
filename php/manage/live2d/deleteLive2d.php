<?php
include "../common/index.php";

$id=$_GET["id"];
$id=explode(",",$id);
$strid='';
for($i=0;$i<count($id);$i++){
    $str="'".$id[$i]."',";
    $strid=$strid.$str;
}
$strid=rtrim($strid,",");

$sql = "DELETE FROM LIVE2D WHERE id in ($strid)";
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