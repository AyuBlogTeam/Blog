<?php
include "../common/index.php";

$post = json_decode(file_get_contents('php://input'),true);
$title = $post['title'];
$summary = $post['summary'];
$coverimg = $post['coverImg'];
$content = htmlspecialchars($post['content'],ENT_QUOTES);
$editname = $post['username'];
if(empty($post["articalId"])){
  $articalid=md5(uniqid("artical",true));
  $sql = "INSERT INTO JOURNAL (title,summary,coverimg,content,editname,articalid) VALUES ('$title','$summary','$coverimg','$content','$editname','$articalid')";
}else{
  $articalid=$post["articalId"];
  $sql = "UPDATE JOURNAL SET title='$title',summary='$summary',coverimg='$coverimg',content='$content',editname='$editname',articalid='$articalid' WHERE articalid='$articalid'";
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