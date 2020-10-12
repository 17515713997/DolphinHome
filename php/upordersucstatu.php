<?php

    header('Content-type:text/html;charset=utf8');

    session_start();
    @$_user = $_SESSION["username"];
    @$_pid=$_REQUEST['pid'];
    @$_orderId=$_REQUEST['orderId'];
    @$_allprice=$_REQUEST['allprice'];
    @$_ordername=$_REQUEST['ordername'];
    @$_orderImg=$_REQUEST['orderImg'];
    @$_orderprice=$_REQUEST['orderprice'];
    @$_orderNum=$_REQUEST['orderNum'];
    @$_orderTime=$_REQUEST['orderTime'];

    $_conn=mysqli_connect("localhost","root","","dolphin");

    $_arr=array();

    $_sql="SET NAMES UTF8";

    mysqli_query($_conn,$_sql);

    $_sql="SELECT * FROM orderdata WHERE orderId='$_orderId' AND username='$_user'";
    $_result=mysqli_query($_conn,$_sql);
    if(($_rows = mysqli_fetch_assoc($_result))!=null){
        $_sql="UPDATE orderdata SET orderstatu='1' WHERE orderId='$_orderId' AND username='$_user'";
        $_result=mysqli_query($_conn,$_sql);
        if($_result){
            $_arr["msgaa"]="ok";
        }else{
            $_arr["msgaa"]=mysqli_error($_conn);
        }
    }else{
        $_sql="INSERT INTO orderdata VALUES(null,'$_pid','$_user','$_orderId','$_allprice','$_ordername','$_orderImg','$_orderprice','$_orderNum','$_orderTime','1')";
        $_result=mysqli_query($_conn,$_sql);
        if($_result){
            $_arr["msg"]="ok";
        }else{
            $_arr["msg"]=mysqli_error($_conn);
        }
    }
    
   
    echo json_encode($_arr);
?>