<?php
    include "../common/uploadconfig.php";
    
    $file = $_FILES["file"];
    //图片文件的生成
    $imgdirs = "blog/".date('Y-m-d',time()).'/';
    $name = $file["name"];
    $local_path = $file["tmp_name"];
    try {
        $result = $cosClient->upload(
            $bucket = 'ayu-1256571018',
            $key = $imgdirs.$name,
            $body = fopen($local_path, 'rb')
        );
        $data["errno"] = 0;
        $data["data"][] = "https://".$result["Location"];
        echo json_encode($data);
    } catch (\Exception $e) {
        echo($e);
    }
?>