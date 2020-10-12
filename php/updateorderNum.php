<?php

    header('Content-type:text/html;charset=utf8');

    $_ordernum=$_REQUEST['ordernum'];
    $_ordername=$_REQUEST['ordername'];
    $_ordermoney=$_REQUEST['ordermoney'];
    $_orderImg=$_REQUEST['orderImg'];

    $_conn=mysqli_connect("localhost","root","","dolphin");

    $_arr=array();

    $_sql="SET NAMES UTF8";

    mysqli_query($_conn,$_sql);

    $_sql="UPDATE wangshop SET num='1' WHERE shopname='$_ordername' AND oldprice='$_ordermoney' AND num='$_ordernum' AND shopImg='$_orderImg'";
    $_result=mysqli_query($_conn,$_sql);
    if($_result){
        $_arr["msg"]="ok";
    }else{
        $_arr["msg"]=mysqli_error($_conn);
    }
    echo json_encode($_arr);
?>