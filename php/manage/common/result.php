<?php
class Success{
    public $code="200";
    public $data;
    public $message="成功";
}
class Fail{
    public $code="500";
    public $data;
    public $message="失败";
}
class AuthFail{
    public $code="401";
    public $data;
    public $message="认证失败";
}
?>