<?php
include "../common/index.php";

$post = json_decode(file_get_contents('php://input'),true);
$title = $post['title'];
$summary = $post['summary'];
$coverimg = $post['coverImg'];
$content = htmlspecialchars($post['content'],ENT_QUOTES);
$editname = $post['username'];
$kind = $post['kind'];
$articalid=md5(uniqid("artical",true));

$sql = "INSERT INTO artical (title,summary,coverimg,content,editname,kind,articalid) VALUES ('$title','$summary','$coverimg','$content','$editname','$kind','$articalid')";

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