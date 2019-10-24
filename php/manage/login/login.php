<?php
include "../common/connect.php";
include "../common/result.php";

$post = json_decode(file_get_contents('php://input'),true);
$username = $post["username"];
$password = $post["password"];

$sql="SELECT * FROM MANAGECOUNT WHERE username='$username' AND password='$password'";
$result=$conn->query($sql);
if($result->num_rows>0){
  session_start();
  $_SESSION["JSESSIONID"]=$username;
  // echo $_SESSION["JSESSIONID"];
  $returnResult = new Success();
  $returnResult->data = "登录成功";
}else{
  $returnResult = new AuthFail();
  $returnResult->data = "未登录";
}
echo json_encode($returnResult);
?>