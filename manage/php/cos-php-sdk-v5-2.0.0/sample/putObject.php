<?php

require dirname(__FILE__) . '/../vendor/autoload.php';

$secretId = "AKID7DC0d4p1VgkuwmbxGOMDsNhW9brwbW1T"; //"云 API 密钥 SecretId";
$secretKey = "SkrzxkLk6MQXWJuKZcUAf4IKA1hS4Vlp"; //"云 API 密钥 SecretKey";
$region = "ap-chengdu"; //设置一个默认的存储桶地域
$cosClient = new Qcloud\Cos\Client(
    array(
        'region' => $region,
        'schema' => 'https', //协议头部，默认为http
        'credentials'=> array(
            'secretId'  => $secretId ,
            'secretKey' => $secretKey)));
$local_path = "./../upload.php";
try {
    $result = $cosClient->putObject(array(
        'Bucket' => 'examplebucket-125000000', //格式：BucketName-APPID
        'Key' => 'exampleobject',
        'Body' => fopen($local_path, 'rb'),
        /*
        'CacheControl' => 'string',
        'ContentDisposition' => 'string',
        'ContentEncoding' => 'string',
        'ContentLanguage' => 'string',
        'ContentLength' => integer,
        'ContentType' => 'string',
        'Expires' => 'string',
        'Metadata' => array(
            'string' => 'string',
        ),
        'StorageClass' => 'string'
        */
    ));
    // 请求成功
    print_r($result);
} catch (\Exception $e) {
    // 请求失败
    echo($e);
}

