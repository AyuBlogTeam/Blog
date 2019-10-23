<?php
include "../common/index.php";
//初始化
$curl = curl_init();
//设置抓取的url
curl_setopt($curl, CURLOPT_URL, 'http://pv.sohu.com/cityjson?ie=utf-8');
//设置头文件的信息作为数据流输出
curl_setopt($curl, CURLOPT_HEADER, 1);
//设置获取的信息以文件流的形式返回，而不是直接输出。
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//执行命令
$data = curl_exec($curl);
if(curl_getinfo($curl,CURLINFO_HTTP_CODE) === 200){
  //关闭URL请求
  curl_close($curl);
  //显示获得的数据
  $data = substr($data,strripos($data,"returnCitySN = ")+15,-1);
  $data = json_decode($data,true);
  $cip = $data["cip"];
  $cid = $data["cid"];
  $cname = $data["cname"];

  $sql = "INSERT INTO VISITORIP (cip,cid,cname) VALUES ('$cip','$cid','$cname')";
  $result = $conn->query($sql);
  if($result){
      $returnResult = new Success();
      $returnResult->data = $cip;
      echo json_encode($returnResult);
  }
}
?>
