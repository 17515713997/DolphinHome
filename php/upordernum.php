<?php

    header('Content-type:text/html;charset=utf8');

    session_start();
    @$_user = $_SESSION["username"];
    @$_did=$_REQUEST['did'];
    @$_name=$_REQUEST['name'];

    $_conn=mysqli_connect("localhost","root","","dolphin");

    $_arr=array();

    $_sql="SET NAMES UTF8";

    mysqli_query($_conn,$_sql);

    $_sql="UPDATE orderdata SET orderstatu='1' WHERE ordername='$_ordername' AND pid='$_did' AND orderstatu='0' AND orderId='$_orderId'";
    $_result=mysqli_query($_conn,$_sql);
    if($_result){
        $_arr["msg"]="ok";
    }else{
        $_arr["msg"]=mysqli_error($_conn);
    }
    echo json_encode($_arr);
?>