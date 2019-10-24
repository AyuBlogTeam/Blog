<?php
error_reporting(0);
$servername = "cdb-h5san8zw.cd.tencentcdb.com:10027";
$username = "root";
$password = "!ayuperson";
$dbname = "blog";

$conn = new mysqli($servername, $username, $password,$dbname);
//数据传输编码
$conn->query("SET NAMES UTF8");
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
?>