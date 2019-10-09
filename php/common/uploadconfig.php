<?php
require dirname(__FILE__) . '\../cos/vendor/autoload.php';
$secretId = "AKID7DC0d4p1VgkuwmbxGOMDsNhW9brwbW1T";
$secretKey = "SkrzxkLk6MQXWJuKZcUAf4IKA1hS4Vlp"; 
$region = "ap-chengdu"; 
$cosClient = new Qcloud\Cos\Client(
  array(
      'region' => $region,
      'schema' => 'https',
      'credentials'=> array(
          'secretId'  => $secretId ,
          'secretKey' => $secretKey)));
?>