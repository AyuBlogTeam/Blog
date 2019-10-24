<?php
include "../common/index.php";

$post = json_decode(file_get_contents('php://input'),true);
$title = $post['title'];
$summary = $post['summary'];
$coverimg = $post['coverImg'];
$content = htmlspecialchars($post['content'],ENT_QUOTES);
$editname = $post['username'];
$kind = $post['kind'];
if(empty($post["articalId"])){
  $articalid=md5(uniqid("artical",true));
  $sql = "INSERT INTO ARTICAL (title,summary,coverimg,content,editname,kind,articalid) VALUES ('$title','$summary','$coverimg','$content','$editname','$kind','$articalid')";
}else{
  $articalid=$post["articalId"];
  $sql = "UPDATE ARTICAL SET title='$title',summary='$summary',coverimg='$coverimg',content='$content',editname='$editname',kind='$kind',articalid='$articalid' WHERE articalid='$articalid'";
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