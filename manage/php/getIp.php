<?php
$iipp = $_SERVER["REMOTE_ADDR"];
/**
 * 获取 IP  地理位置
 * 淘宝IP接口
 * @Return: array
 */
function getCity($ip = '')
{
    if($ip == ''){
        $url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json";
        $ip=json_decode(file_get_contents($url),true);
        $data = $ip;
    }else{
        $url="http://ip.ws.126.net/ipquery?ip=222.209.152.73";
        $ip=json_decode(file_get_contents($url));   
        echo json_encode($ip);
        // if((string)$ip->code=='1'){
        //    return false;
        // }
        // $data = (array)$ip->data;
    }
    // return $data;   
}
getCity($iipp);
// var_dump(getCity($iipp));
?>
