<?php
include "../common/result.php";
session_start();
if(empty($_SESSION["JSESSIONID"])){
  $returnResult = new AuthFail();
  $returnResult->data = "未登录";
  echo json_encode($returnResult);
  exit;
}

?>