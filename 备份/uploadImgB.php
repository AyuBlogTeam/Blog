<?php
    $file = $_FILES["file"];
    echo $file["name"];
    //图片文件的生成
    $savename = date('YmdHis',time()).mt_rand(0,9999).'.jpeg';//localResizeIMG压缩后的图片都是jpeg格式
    
    //生成文件夹
    $imgdirs = "/upload/image/".date('Y-m-d',time()).'/';
    mkdirs(dirname(__FILE__).$imgdirs);
    //获取图片文件的名字
    $fileName = $file["name"];
    //图片保存的路径
    $savepath = dirname(__FILE__).$imgdirs.$savename;
    //生成一个URL获取图片的地址
    $url = "http://localhost:8081" . $imgdirs.$savename;
    //返回数据。wangeditor3 需要用到的数据 json格式的
    $data["errno"] = 0;
    $data["data"][] = $url;
    // $data['url'] = "{$url}";
    //可有可无的一段，也就是图片文件移动。
    move_uploaded_file($file["tmp_name"],$savepath);
    //返回数据
    echo json_encode($data);
        //创建文件夹 权限问题
    function mkdirs($dir, $mode = 0777){
        if (is_dir($dir) || @mkdir($dir, $mode)) return TRUE;
        if (!mkdirs(dirname($dir), $mode)) return FALSE;
        return @mkdir($dir, $mode);
    }

?>