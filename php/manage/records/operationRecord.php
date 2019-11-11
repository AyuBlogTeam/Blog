<?php
include "../common/index.php";

$post = json_decode(file_get_contents('php://input'),true);
$content = htmlspecialchars($post['content'],ENT_QUOTES);
$editname = $post['username'];
$ismusic = $post['ismusic'];
if(empty($post["articalId"])){
  $articalid=md5(uniqid("artical",true));
  $sql = "INSERT INTO RECORD (content,editname,articalid,ismusic) VALUES ('$content','$editname','$articalid','$ismusic')";
}else{
  $articalid=$post["articalId"];
  $sql = "UPDATE RECORD SET content='$content',editname='$editname',articalid='$articalid' WHERE articalid='$articalid'";
}

$result = $conn->query($sql);
if($result){
    $returnResult = new Success();
    $returnResult->data = "发布成功";
}else{
    $returnResult = new Fail();
    $returnResult->data = "发布失败";
}
echo json_encode($returnResult);
?>